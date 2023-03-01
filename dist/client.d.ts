import { BaseSymbol } from "./handler";
import { z } from "zod";
type ParametersExceptFirst<F> = F extends (arg0: any, ...rest: infer R) => any ? R : never;
type Promisify<T> = T extends Promise<any> ? T : Promise<T>;
type ToAsyncFn<Fn extends (...args: any) => any> = Parameters<Fn>[0][typeof BaseSymbol] extends true | undefined ? (...args: ParametersExceptFirst<Fn>) => Promisify<ReturnType<Fn>> : (...args: Parameters<Fn>) => Promisify<ReturnType<Fn>>;
export default function compile<Shape extends z.ZodRawShape>(schema: z.ZodObject<Shape>, url: string): (z.baseObjectOutputType<Shape> extends infer T_1 extends object ? { [k_1 in keyof T_1]: z.baseObjectOutputType<Shape>[k_1]; } : never) extends infer T ? { [k in keyof T]: ToAsyncFn<(z.baseObjectOutputType<Shape> extends infer T_1 extends object ? { [k_1 in keyof T_1]: z.baseObjectOutputType<Shape>[k_1]; } : never)[k]>; } : never;
export {};
