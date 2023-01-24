import queryString from 'query-string';
import axios from 'axios';

const removeSlashes = str => str?.replace(/^\/|\/$/g, '');

const apiUrl = 'https://servers101.netlify.app/';

const ajaxCall = {
  get: (endpoint, headers, params, blob) => new Promise((resolve, reject) => {
    const url = `${apiUrl}/${removeSlashes(endpoint)}`;
    const query = params ? `?${queryString.stringify(params)}` : '';
    axios(`${url}${query}`, {
        method: 'get',
        credentials: 'include',
        headers,
        responseType: blob ? 'blob' : 'json',
      })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return resolve(response.data);
        }
        return reject(new Error(response.message));
      })
      .catch(err => reject(new Error(err.message)));
  }),
  post: (endpoint, headers, body) => new Promise((resolve, reject) => {
    const url = `${apiUrl}/${removeSlashes(endpoint)}`;
    const payload = JSON.stringify(body);
    fetch(url, {
        method: 'post',
        body: payload,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        credentials: 'include',
      })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return resolve(response.json());
        }
        return response.json().then((e => reject(JSON.stringify({
          statusText: response.statusText,
          status: response.status,
          message: e.message
        }))));
      })
      .catch(err => reject(new Error(err.message)));
  }),
  delete: (endpoint, headers, params, blob, body) => new Promise((resolve, reject) => {
    const url = `${apiUrl}/${removeSlashes(endpoint)}`;
    const query = params ? `?${queryString.stringify(params)}` : '';
    axios(`${url}${query}`, {
        method: 'delete',
        headers,
        credentials: 'include',
        responseType: blob ? 'blob' : 'json',
        data: body,
      })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return resolve(response.data);
        }
        return reject(new Error(response.statusText));
      })
      .catch(err => reject(new Error(err.statusText)));
  }),
  put: (endpoint, headers, body, params, blob) => new Promise((resolve, reject) => {
    const url = `${apiUrl}/${removeSlashes(endpoint)}`;
    const payload = JSON.stringify(body);
    fetch(url, {
        method: 'put',
        body: payload,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        credentials: 'include',
      })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return resolve(response.json());
        }
        return response.json().then((e => reject(JSON.stringify({
          statusText: response.statusText,
          status: response.status,
          message: e.message
        }))));
      })
      .catch(err => reject(new Error(err.statusText)));
  }),
};

export default ajaxCall;