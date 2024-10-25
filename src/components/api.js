const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-24',
  headers: {
    authorization: '11708cf8-2a4d-43f1-956c-afd55510f09f',
    'Content-Type': 'application/json'
  }
}

const handleResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export function get(uri) {
  const targetUrl = config.baseUrl + uri;
  const headers = config.headers;
  return fetch(targetUrl, {
    method: "GET",
    headers
  })
  .then(handleResponse);
}

function post(uri, data, method = "POST") {
  const targetUrl = config.baseUrl + uri;
  const headers = config.headers;
  const body = JSON.stringify(data);
  return fetch(targetUrl, {
    method,
    headers,
    body,
  }).then(handleResponse);
}

function patch(uri, data) {
  const targetUrl = config.baseUrl + uri;
  const headers = config.headers;
  const body = JSON.stringify(data);
  return fetch(targetUrl, {
  method: 'PATCH',
  headers,
  body
  }).then(handleResponse);
}

function delCard(uri, id) {
  const targetUrl = config.baseUrl + uri + id;
  const headers = config.headers;
  return fetch(targetUrl, {
    method: 'DELETE',
    headers
  }).then(handleResponse);
}

const likeCard = (uri, id) => {
  const targetUrl = config.baseUrl + uri + id;
  const headers = config.headers;
  return fetch(targetUrl, {
    method: 'PUT',
    headers
  }).then(handleResponse);
}

const dislikeCard = (uri, id) => {
  const targetUrl = config.baseUrl + uri + id;
  const headers = config.headers;
  return fetch(targetUrl, {
    method: 'DELETE',
    headers
  }).then(handleResponse);
}

const makeApi = () => ({
  getUserInfo: () => get('/users/me'),
  getListCards: () => get('/cards'),
  updateProfile: (data) => patch('/users/me', data),
  updateAvatar: (data) => patch('/users/me/avatar', data),
  createCard: (data) => post('/cards', data),
  deleteCard: (id) => delCard('/cards/', id),
  setLike: (id) => likeCard('/cards/likes/', id),
  delLike: (id) => dislikeCard('/cards/likes/', id)
});

export const baseApi = makeApi();
