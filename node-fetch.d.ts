// Modified from source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/587f9d9cb018514c03434ccc0fc53ffcad32e8b7/isomorphic-fetch/isomorphic-fetch.d.ts

declare enum RequestContext {
    "audio", "beacon", "cspreport", "download", "embed", "eventsource",
    "favicon", "fetch", "font", "form", "frame", "hyperlink", "iframe",
    "image", "imageset", "import", "internal", "location", "manifest",
    "object", "ping", "plugin", "prefetch", "script", "serviceworker",
    "sharedworker", "subresource", "style", "track", "video", "worker",
    "xmlhttprequest", "xslt"
}
declare enum RequestMode { "same-origin", "no-cors", "cors" }
declare enum RequestCredentials { "omit", "same-origin", "include" }
declare enum RequestCache {
    "default", "no-store", "reload", "no-cache", "force-cache",
    "only-if-cached"
}
declare enum ResponseType { "basic", "cors", "default", "error", "opaque" }
    
declare namespace fetch 
{
    type HeaderInit = IHeaders | Array<string>;
    type BodyInit = ArrayBuffer | ArrayBufferView | Blob | FormData | string;
    type RequestInfo = IRequest | string;

    interface RequestInit {
        method?: string;
        headers?: HeaderInit | { [index: string]: string };
        body?: BodyInit;
        mode?: string | RequestMode;
        credentials?: string | RequestCredentials;
        cache?: string | RequestCache;
    }

    interface IHeaders {
        new() : IHeaders;
        append(name: string, value: string): void;
        delete(name: string):void;
        get(name: string): string;
        getAll(name: string): Array<string>;
        has(name: string): boolean;
        set(name: string, value: string): void;
    }

    interface IBody {
        new() : IBody;
        bodyUsed: boolean;
        arrayBuffer(): Promise<ArrayBuffer>;
        blob(): Promise<Blob>;
        formData(): Promise<FormData>;
        json(): Promise<any>;
        json<T>(): Promise<T>;
        text(): Promise<string>;
    }

    interface IRequest extends IBody {
        new(input: string | IRequest, init?: RequestInit): IRequest;
        method: string;
        url: string;
        headers: IHeaders;
        context: string | RequestContext;
        referrer: string;
        mode: string | RequestMode;
        credentials: string | RequestCredentials;
        cache: string | RequestCache;
    }

    interface IResponse extends IBody {
        url: string;
        status: number;
        statusText: string;
        ok: boolean;
        headers: IHeaders;
        type: string | ResponseType;
        size: number;
        timeout: number;
        redirect(url: string, status: number): IResponse;
        error(): IResponse;
        clone(): IResponse;
    }
    
    interface FetchStatic
    {
        RequestContext: RequestContext;
        RequestMode: RequestMode;
        RequestCredentials: RequestCredentials;
        RequestCache: RequestCache;
        ResponseType: ResponseType;
        Promise: any;
        Headers: IHeaders
        Request: IRequest;
        Response: IResponse;
        (url: string | IRequest, init?: RequestInit): Promise<IResponse>;
    }
}

declare var fetch: fetch.FetchStatic;

export = fetch;