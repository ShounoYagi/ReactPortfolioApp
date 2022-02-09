
import { LocationDescriptorObject, History } from "history";
import { useContext } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { AppContext } from "./App";
import { ApplicationPaths, QueryParameterNames } from './components/api-authorization/ApiAuthorizationConstants';
import authService from './components/api-authorization/AuthorizeService';
import { APIArgs, ApiMethod, UserData } from "./react-app-env";



const logoutPath = { pathname: `${ApplicationPaths.LogOut}`, state: { local: true } };

export const FONT_SIZE = {
    body_text : 12
}


export function useCommon() {
    const history = useHistory();
    const params = useParams<{ [key: string]: string }>();
    const { appContext, setAppContext } = useContext(AppContext);
    const withLoading = <T = any>(p: Promise<T>) => {
        //setAppContext((c) => ({ backdropIsopen: true }));
        return p.then((res) => {
            //setAppContext((c) => ({ backdropIsopen: false }));
            return res;
        }, (err) => {
            //setAppContext((c) => ({ backdropIsopen: false }));
            return Promise.reject(err);
        });
    }
    return {
        history: history,
        params: params,
        appContext: appContext,
        setAppContext: setAppContext,
        getUser: async () => (authService.getUser() as Promise<UserData>),
        go: (path: string | LocationDescriptorObject) => history.push(path),
        logout: () => history.push(logoutPath),
        withLoading: withLoading,
        api: async <TArgs = APIArgs, TResponse = any>(path: string, method: ApiMethod, args?: TArgs) => {
            // expired時に再ログインする
            const expired = await checkExpiredAndRedirect(history);
            if (expired) {
                return {} as TResponse;
            }
            return withLoading(api<TArgs, TResponse>(path, method, args));
        }
    };
}

//認証期限切れの時にリダイレクトする
async function checkExpiredAndRedirect(history: History) {
    const oUser = await authService.userManager?.getUser();
    if (oUser && oUser.expired) {
        var link = document.createElement("a");
        link.href = window.location.href;
        const returnUrl = `${link.protocol}//${link.host}${link.pathname}${link.search}${link.hash}`;
        const redirectUrl = `${ApplicationPaths.Login}?${QueryParameterNames.ReturnUrl}=${encodeURI(returnUrl)}`;
        history.push(redirectUrl);
        return true;
    }
    return false;
}

function toQuery(args: any) {
    const parts: string[] = [];
    for (let p in args) {
        try {
            const v = args[p];
            parts.push(encodeURIComponent(p) + "=" + encodeURIComponent(v));
        } catch (e) {
            console.log(e);
        }
    }
    return "?" + (parts.join("&"));
}


/**
 * API呼び出しの本体
 * @param path 
 * @param method 
 * @param args 
 */
 async function api<TArgs = APIArgs, TResponse = any>(path: string, method: ApiMethod, args?: TArgs) {
    const token = await authService.getAccessToken();
    const headers = new Headers({
        "Content-Type": "application/json; charset=utf-8"
    });
    if (token) {
        headers.append('Authorization', `Bearer ${token}`);
    } else {
        console.warn("no token");
    }

    const hasQuery = args && (method === "GET" || method === "DELETE");
    const query = hasQuery ? toQuery(args) : "";

    const hasBody = args && (method === "POST" || method === "PUT" || method === "PATCH");
    const body = hasBody ? JSON.stringify(args) : undefined;

    const response = await fetch(path + query, {
        method: method,
        cache: "no-cache",
        credentials: 'same-origin', // include, *same-origin, omit
        headers: headers,
        body: body
    });
    if (!response.ok) {
        return Promise.reject(`error status code : ${response.status} ${response.statusText}`);
    }
    return await response.json() as Promise<TResponse>;
}
