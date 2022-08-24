import { userMeta } from "../components/login.component";
import { get, post } from "./authAjaxService";

const localStorageAuthTokenKey = 'leave'

export function getBearerToken() {
    return localStorage.getItem(localStorageAuthTokenKey)
}

export function setBearerToken(token: string) {
    localStorage.setItem(localStorageAuthTokenKey, token)
}

// export async function logout() {
//     const res = await post<any>('/usermeta/logout', {})
//     if(res) {
//         localStorage.removeItem(localStorageAuthTokenKey);
//         location.href = "/login"
//     }
// }

export function goToLoginPage() {
    window.location.href = `/login`
}



export async function getMeta(): Promise<userMeta | null> {
    const res = await get<userMeta>('/register/get-meta')
    return res && res.data;
}

// export async function getUsers() {
//     const res = await get<user[]>('/user')
//     return res && res.data;
// }