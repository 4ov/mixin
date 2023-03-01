import { MixinError } from "./types"
import { z } from "zod";

export function ErrorToJson(error: any){
    if(error instanceof Error){
        const result: z.infer<typeof MixinError> =  {
            message: error.message,
            name: error.name,
            cause: error.cause,
            stack: error.stack
        }
        return result
    }else{
        console.log(error);
        
        return {
           ...error
        }
    }
    
}

export function JsonToError(input: any){
    const output = MixinError.safeParse(input)
    if(output.success){
        const error = output.data
        return new class extends Error{
            name = error.name
            message = error.message
            cause = error.cause
            stack = error.stack
        }
    }else{
        return new Error(input)
    }
}