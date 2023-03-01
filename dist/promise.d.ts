export default class MixinPromise {
    private url;
    private fnName;
    private fnArgs;
    constructor(url: string, fnName: string, fnArgs: any[]);
    single(): Promise<any>;
    then<T, R>(onresolve: (data: T) => R, onreject?: (reason: any) => MixinPromise): any;
}
