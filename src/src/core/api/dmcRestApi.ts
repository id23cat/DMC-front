import { rootViewStore } from "../../stores/rootViewStore";
import { ApiError } from "./errors/apiError";
import * as queryString from "querystring";
import { Dictionary } from "../../typings/customTypings";
import { UserAccountService } from "../services/userAccountService";

interface HttpRequestOptions {
    url: string;
    method: "GET" | "POST" | "PUT" | "DELETE";
    body?: any;
    headers?: HeadersInit;
}

const apiConstants = {
    headers: {
        errorCode: "X-ERROR-CODE",
        errorId: "X-ERROR-ID",
        payloadError: "X-ERROR-PAYLOAD",
    },
};

export class DmcRestApi {
    public static get = async <TData extends any>(url: string, query?: any): Promise<TData> => {
        return DmcRestApi.request<TData>({
            method: "GET",
            url: query ? `${url}?${queryString.stringify(query)}` : url,
        });
    };

    public static post = async <TData extends any>(url: string, body?: any): Promise<TData> => {
        return DmcRestApi.request<TData>({
            method: "POST",
            url: url,
            body: body,
        });
    };

    public static put = async <TData extends any>(url: string, body?: any): Promise<TData> => {
        return DmcRestApi.request<TData>({
            method: "PUT",
            url: url,
            body: body,
        });
    };

    public static delete = async <TData extends any>(url: string): Promise<TData> => {
        return DmcRestApi.request<TData>({
            method: "DELETE",
            url: url,
        });
    };

    private static request = async <TData extends any>(options: HttpRequestOptions): Promise<TData> => {
        DmcRestApi.toggleLoading(true);
        let response: Response;
        try {
            response = await fetch(options.url, {
                method: options.method,
                body: DmcRestApi.getBody(options),
                credentials: "same-origin",
                headers: {
                    ...DmcRestApi.getHeaders(),
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });
        } finally {
            DmcRestApi.toggleLoading(false);
        }

        return await DmcRestApi.parseResponse<TData>(response);
    };

    private static getHeaders = (): Dictionary<any> | undefined => {
        const headers = {} as any;
        const token = UserAccountService.getUserAccessToken();
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        return headers;
    };

    private static getBody = (options: HttpRequestOptions) => {
        return options.body && JSON.stringify(options.body);
    };

    private static parseResponse = async <TData extends any>(response: Response): Promise<TData> => {
        if (!response.ok) {
            DmcRestApi.handleError(response);
        }

        const text = await response.text();
        return text ? JSON.parse(text) : {};
    };

    private static handleError = (response: Response) => {
        const errorCode = response.headers.get(apiConstants.headers.errorCode) as string;
        const errorId = response.headers.get(apiConstants.headers.errorId) as string;
        const payloadError = response.headers.get(apiConstants.headers.payloadError);

        throw new ApiError(response, errorCode, errorId, payloadError ? JSON.parse(payloadError) : {});
    };

    private static toggleLoading(show: boolean) {
        if (show) {
            rootViewStore.showLoading();
        } else {
            rootViewStore.hideLoading();
        }
    }
}
