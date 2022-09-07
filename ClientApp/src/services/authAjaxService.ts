import axios from 'axios';
// import { getBearerToken, goToLoginPage } from './auth.service';
// import { showErrorMessage } from './user.service';
// export const baseurl = 'http://localhost:5002';

// const baseEndpoint = baseurl;
// const instance = axios.create({
//     baseURL: baseEndpoint
// })

// //Add bearer token to each request if available
// instance.interceptors.request.use(function (config: any) {
//     const token = getBearerToken();
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// }, function (err) {
//     return Promise.reject(err);
// });

// //redirect to login of 401
// // instance.interceptors.response.use(function (response) {
// //     return response;
// // }, function (error) {
// //         goToLoginPage()
    
// // });

// function handleError(error: any, onError?: false | (() => void)) {
//     const statusCode = error.response.status || 500;

//     var errorTitle = "Task failed, please retry.";
//     if (error.response.data)
//         errorTitle = `Failed. ${error.response.data}`;

//     if (statusCode === 404) {
//         errorTitle = "Content or Resource not found";
//     }

//     if (statusCode === 400) {
//         errorTitle = "Invalid request";
//     }

//     if (statusCode === 401) {
//         errorTitle = "Unauthorized, please login again.";
//     }

//     showErrorMessage(errorTitle);
//     if (onError) onError();
// }

// export async function get<TResponse>(url: string) {
//     return instance.get<TResponse>(url)
//         .catch(error => {
//             handleError(error)
//             throw error;
//         });
// }

// export async function post<TResponse>(url: string, body: {}, onError?: false | (() => void)) {
//     try {
//         //console.log('posting',url, JSON.stringify(body))
//         const res = await instance.post<TResponse>(url, body)
//         return res && res;
//     } catch (error) {
//         handleError(error, onError);
//     }
// }

// export async function del(url: string) {
//     try {
//         return await instance.delete(url)
//     } catch (error) {
//         console.log(error)
//         showErrorMessage("Could not delete this item");
//     }
// }