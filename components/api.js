export class Api {
    constructor(baseUrl, token) {
        this._baseUrl = baseUrl;
        this._token = token;
    }

    getUserData() {
        return fetch(`${this._baseUrl}/users/me`, {
                headers: {
                    authorization: this._token
                }
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();

                }
                return Promise.reject(`Что-то пошло не так: ${res.status}`);
            })
    }

    updateUserInfo(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: about
            })
        })

        .then((res) => {
            if (res.ok) {
                return res.json();

            }
            return Promise.reject(`Что-то пошло не так: ${res.status}`);
        })
    }

    updateUserAvatar(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
                method: 'PATCH',
                headers: {
                    authorization: this._token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    avatar: avatar
                })
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Что-то пошло не так: ${res.status}`);
            })

    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
                headers: {
                    authorization: this._token
                }
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();

                }
                return Promise.reject(`Что-то пошло не так: ${res.status}`);
            })
    }

    addCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
                method: 'POST',
                headers: {
                    authorization: this._token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    link: link
                })
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();

                }
                return Promise.reject(`Что-то пошло не так: ${res.status}`);
            })
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: this._token
                }
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();

                }
                return Promise.reject(`Что-то пошло не так: ${res.status}`);
            })
    }

    addCardLike(id) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
                method: 'PUT',
                headers: {
                    authorization: this._token
                }
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();

                }
                return Promise.reject(`Что-то пошло не так: ${res.status}`);
            })
    }

    deleteCardLike(id) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: this._token
                }
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();

                }
                return Promise.reject(`Что-то пошло не так: ${res.status}`);
            })
    }

}