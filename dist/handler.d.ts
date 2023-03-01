import { z } from "zod";
export declare const BaseSymbol: unique symbol;
export declare const BaseContext: z.ZodObject<{
    [BaseSymbol]: z.ZodDefault<z.ZodLiteral<true>>;
}, "strip", z.ZodTypeAny, {
    [BaseSymbol]?: true;
}, {
    [BaseSymbol]?: true;
}>;
declare const BaseShape: {
    [BaseSymbol]: z.ZodDefault<z.ZodLiteral<true>>;
};
export default class Handler<Shape extends z.ZodRawShape, ContextShape extends typeof BaseShape> {
    private context;
    private functions;
    private shape;
    constructor(schema: z.ZodObject<Shape>, implementation: z.infer<z.ZodObject<Shape>>, context: z.ZodObject<ContextShape>);
    private call;
    private single;
    private group;
    handle(rewRequest: unknown, rawContext: Omit<z.infer<z.ZodObject<ContextShape>>, typeof BaseSymbol>): Promise<{
        status?: "fulfilled";
        value?: any;
    } | {
        status?: "rejected";
        reason?: any;
    } | PromiseSettledResult<{
        status?: "fulfilled";
        value?: any;
    } | {
        status?: "rejected";
        reason?: any;
    }>[]>;
}
export {};
