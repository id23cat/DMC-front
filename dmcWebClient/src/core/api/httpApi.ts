interface Options {
    url: string;
    method: "GET" | "POST" | "PUT" | "DELETE",
    body?: any;
}

export class HttpApi {
    public static get = async <TData extends void>(url: string): Promise<TData> => {
        return HttpApi.request<TData>({
            method: "GET",
            url: url,
        })
    };

    public static post = async <TData extends void>(url: string, body?: any): Promise<TData> => {
        return HttpApi.request<TData>({
            method: "POST",
            url: url,
            body: body,
        });
    };

    public static put = async <TData extends void>(url: string, body?: any): Promise<TData> => {
        return HttpApi.request<TData>({
            method: "PUT",
            url: url,
            body: body,
        });
    };

    public static delete = async <TData extends void>(url: string): Promise<TData> => {
        return HttpApi.request<TData>({
            method: "DELETE",
            url: url,
        });
    };

    private static request = async <TData extends void>(options: Options): Promise<TData> => {
        const response = await fetch(options.url, {
            method: options.method,
            body: options.body && JSON.stringify(options.body),
        });

        if (response.ok) {
            return await response.json() as TData;
        } else {
            throw new Error();
        }
    }
}
