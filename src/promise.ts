import { z } from "zod";
import { SingleRequest, SingleResponse } from "./types";
import { JsonToError } from "./utils";
import fetch from 'cross-fetch'
export default class MixinPromise {
    constructor(
        private url: string,
        private fnName: string,
        private fnArgs: any[]
    ) {}

    async single() {
        try {
            const request: z.infer<typeof SingleRequest> = {
                type: "single",
                name: this.fnName,
                args: this.fnArgs,
            };
            return fetch(this.url, {
                method: "POST",
                body: JSON.stringify(request),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then((d) => d.json())
                .then((d) => SingleResponse.safeParse(d))
                .then((d) => {
                    if (d.success) return d.data;
                    else throw new Error("bad Response");
                })
                .then((d) => {
                    if (d.status === "fulfilled") return d.value;
                    else throw JsonToError(d.reason);
                });
        } catch (reason) {
            throw new Error("bad Response");
        }
    }
    //@ts-ignore
    then<T, R>(
        onresolve: (data: T) => R,
        onreject?: (reason: any) => MixinPromise
    ) {
        return this.single().then(onresolve, onreject);
    }
}
