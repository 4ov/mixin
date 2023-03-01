import { z } from "zod";
export declare const BaseRequest: z.ZodObject<{
    name: z.ZodString;
    args: z.ZodArray<z.ZodAny, "many">;
}, "strip", z.ZodTypeAny, {
    name?: string;
    args?: any[];
}, {
    name?: string;
    args?: any[];
}>;
export declare const SingleRequest: z.ZodObject<{
    name: z.ZodString;
    args: z.ZodArray<z.ZodAny, "many">;
    type: z.ZodLiteral<"single">;
}, "strip", z.ZodTypeAny, {
    name?: string;
    args?: any[];
    type?: "single";
}, {
    name?: string;
    args?: any[];
    type?: "single";
}>;
export declare const GroupRequest: z.ZodObject<{
    type: z.ZodLiteral<"group">;
    content: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        args: z.ZodArray<z.ZodAny, "many">;
    }, "strip", z.ZodTypeAny, {
        name?: string;
        args?: any[];
    }, {
        name?: string;
        args?: any[];
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    type?: "group";
    content?: {
        name?: string;
        args?: any[];
    }[];
}, {
    type?: "group";
    content?: {
        name?: string;
        args?: any[];
    }[];
}>;
export declare const BaseResponseFullfilled: z.ZodObject<{
    status: z.ZodLiteral<"fulfilled">;
    value: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    status?: "fulfilled";
    value?: any;
}, {
    status?: "fulfilled";
    value?: any;
}>;
export declare const BaseResponseRejected: z.ZodObject<{
    status: z.ZodLiteral<"rejected">;
    reason: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    status?: "rejected";
    reason?: any;
}, {
    status?: "rejected";
    reason?: any;
}>;
export declare const BaseResponse: z.ZodUnion<[z.ZodObject<{
    status: z.ZodLiteral<"fulfilled">;
    value: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    status?: "fulfilled";
    value?: any;
}, {
    status?: "fulfilled";
    value?: any;
}>, z.ZodObject<{
    status: z.ZodLiteral<"rejected">;
    reason: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    status?: "rejected";
    reason?: any;
}, {
    status?: "rejected";
    reason?: any;
}>]>;
export declare const SingleResponse: z.ZodUnion<[z.ZodObject<{
    status: z.ZodLiteral<"fulfilled">;
    value: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    status?: "fulfilled";
    value?: any;
}, {
    status?: "fulfilled";
    value?: any;
}>, z.ZodObject<{
    status: z.ZodLiteral<"rejected">;
    reason: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    status?: "rejected";
    reason?: any;
}, {
    status?: "rejected";
    reason?: any;
}>]>;
export declare const GroupResponse: z.ZodArray<z.ZodUnion<[z.ZodObject<{
    status: z.ZodLiteral<"fulfilled">;
    value: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    status?: "fulfilled";
    value?: any;
}, {
    status?: "fulfilled";
    value?: any;
}>, z.ZodObject<{
    status: z.ZodLiteral<"rejected">;
    reason: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    status?: "rejected";
    reason?: any;
}, {
    status?: "rejected";
    reason?: any;
}>]>, "many">;
export declare const MixinResponse: z.ZodUnion<[z.ZodUnion<[z.ZodObject<{
    status: z.ZodLiteral<"fulfilled">;
    value: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    status?: "fulfilled";
    value?: any;
}, {
    status?: "fulfilled";
    value?: any;
}>, z.ZodObject<{
    status: z.ZodLiteral<"rejected">;
    reason: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    status?: "rejected";
    reason?: any;
}, {
    status?: "rejected";
    reason?: any;
}>]>, z.ZodArray<z.ZodUnion<[z.ZodObject<{
    status: z.ZodLiteral<"fulfilled">;
    value: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    status?: "fulfilled";
    value?: any;
}, {
    status?: "fulfilled";
    value?: any;
}>, z.ZodObject<{
    status: z.ZodLiteral<"rejected">;
    reason: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    status?: "rejected";
    reason?: any;
}, {
    status?: "rejected";
    reason?: any;
}>]>, "many">]>;
export declare const MixinRequest: z.ZodUnion<[z.ZodObject<{
    name: z.ZodString;
    args: z.ZodArray<z.ZodAny, "many">;
    type: z.ZodLiteral<"single">;
}, "strip", z.ZodTypeAny, {
    name?: string;
    args?: any[];
    type?: "single";
}, {
    name?: string;
    args?: any[];
    type?: "single";
}>, z.ZodObject<{
    type: z.ZodLiteral<"group">;
    content: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        args: z.ZodArray<z.ZodAny, "many">;
    }, "strip", z.ZodTypeAny, {
        name?: string;
        args?: any[];
    }, {
        name?: string;
        args?: any[];
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    type?: "group";
    content?: {
        name?: string;
        args?: any[];
    }[];
}, {
    type?: "group";
    content?: {
        name?: string;
        args?: any[];
    }[];
}>]>;
export declare const MixinError: z.ZodObject<{
    name: z.ZodString;
    message: z.ZodString;
    cause: z.ZodOptional<z.ZodAny>;
    stack: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name?: string;
    message?: string;
    cause?: any;
    stack?: string;
}, {
    name?: string;
    message?: string;
    cause?: any;
    stack?: string;
}>;
