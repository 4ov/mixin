import { z } from "zod";

export const BaseRequest = z.object({
    name: z.string(),
    args: z.any().array(),
});

export const SingleRequest = BaseRequest.extend({
    type: z.literal("single"),
});

export const GroupRequest = z.object({
    type: z.literal("group"),
    content: BaseRequest.array(),
});

// let x : PromiseSettledResult

export const BaseResponseFullfilled = z.object({
    status: z.literal("fulfilled"),
    value: z.any(),
});

export const BaseResponseRejected = z.object({
    status: z.literal("rejected"),
    reason: z.any(),
});

export const BaseResponse = BaseResponseFullfilled.or(BaseResponseRejected);
export const SingleResponse = BaseResponse;
export const GroupResponse = BaseResponse.array();

export const MixinResponse = SingleResponse.or(GroupResponse);
export const MixinRequest = SingleRequest.or(GroupRequest);



export const MixinError = z.object({
    name: z.string(),
    message: z.string(),
    cause: z.any().optional(),
    stack: z.string().optional(),
})