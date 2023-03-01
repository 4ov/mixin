import { BaseSymbol } from "./handler";
import { z } from "zod";
import MixinPromise from "./promise";

type ParametersExceptFirst<F> = F extends (arg0: any, ...rest: infer R) => any
    ? R
    : never;


type Promisify<T> = T extends Promise<any> ? T : Promise<T>;

type ToAsyncFn<Fn extends (...args: any) => any> =
    Parameters<Fn>[0][typeof BaseSymbol] extends true | undefined //TODO: i doubt this is a good practice
        ? (...args: ParametersExceptFirst<Fn>) => Promisify<ReturnType<Fn>>
        : (...args: Parameters<Fn>) => Promisify<ReturnType<Fn>>;


type Elms<T extends z.ZodType> = z.infer<T>

export default function compile<Shape extends z.ZodRawShape>(
    schema: z.ZodObject<Shape>,
    url: string
) {
    //@ts-ignore: TS2589
    // type Elms = z.infer<typeof schema>;

    const proxy = new Proxy(
        {},
        {
            get(_self, name, _r) {
                if (name === "$") throw new Error("not implemented");
                return async (...args: any[]) => {
                    return await new MixinPromise(url, name.toString(), args);
                };
            },
        }
    );

    return proxy as { [k in keyof Elms<typeof schema>]: ToAsyncFn<Elms<typeof schema>[k]> };
}
