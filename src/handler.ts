import { z } from "zod";
import {
    GroupRequest,
    MixinRequest,
    SingleRequest,
    SingleResponse,
} from "./types";
import { ErrorToJson } from "./utils";

export const BaseSymbol = Symbol("Base");

export const BaseContext = z.object({
    [BaseSymbol]: z.literal(true).default(true),
});

const BaseShape = BaseContext.shape;

export default class Handler<
    Shape extends z.ZodRawShape,
    ContextShape extends typeof BaseShape
> {
    private functions: z.infer<z.ZodObject<Shape>>;
    private shape: Shape;
    constructor(
        schema: z.ZodObject<Shape>,
        implementation: z.infer<z.ZodObject<Shape>>,
        private context: z.ZodObject<ContextShape>
    ) {
        const output = schema.safeParse(implementation);
        if (output.success) {
            this.functions = output.data;
            this.shape = schema.shape;
        } else {
            throw new Error("Functions are not compatable");
        }
    }

    private async call(
        name: string,
        args: any[],
        context: z.infer<z.ZodObject<ContextShape>>
    ) {
        if (Object.hasOwn(this.functions, name)) {
            //@ts-ignore
            const fnImpl = this.functions[name];
            const fnSign = this.shape[name] as z.ZodFunction<any, any>;
            const firstParamIsContext =
                !!fnSign.parameters().items?.[0]?.shape?.[BaseSymbol];

            if (firstParamIsContext) args = [context, ...args];

            try {
                const value = await fnImpl(...args);
                const response: z.infer<typeof SingleResponse> = {
                    status: "fulfilled",
                    value,
                };
                return response;
            } catch (reason) {
                const response: z.infer<typeof SingleResponse> = {
                    status: "rejected",
                    reason: ErrorToJson(reason),
                };
                return response;
            }
        } else {
            const response: z.infer<typeof SingleResponse> = {
                status: "rejected",
                reason: ErrorToJson(new Error("Function Not Found")),
            };
            return response;
        }
    }

    private async single(
        request: Omit<z.infer<typeof SingleRequest>, "type">,
        context: z.infer<z.ZodObject<ContextShape>>
    ) {
        const { args, name } = request;
        if (Object.hasOwn(this.functions, name)) {
            return this.call(name, args, context);
        } else {
            throw new Error("Not found");
        }
    }

    private async group(
        request: z.infer<typeof GroupRequest>,
        context: z.infer<z.ZodObject<ContextShape>>
    ) {
        const { content } = request;
        return await Promise.allSettled(
            content.map(async (fn) => {
                return this.single(fn, context);
            })
        );
    }

    async handle(
        rewRequest: unknown,
        rawContext: Omit<z.infer<z.ZodObject<ContextShape>>, typeof BaseSymbol>
    ) {
        const contextInput = this.context.safeParse(rawContext);
        if (!contextInput.success) throw new Error("Bad Context");
        const context = contextInput.data;

        const requestInput = MixinRequest.safeParse(rewRequest);
        if (!requestInput.success)
            throw new Error("Bad Request form", {
                //@ts-ignore
                cause: requestInput.error.message,
            });

        const request = requestInput.data;
        if (request.type === "single") {
            return await this.single(request, context);
        } else {
            return await this.group(request, context);
        }
    }
}




