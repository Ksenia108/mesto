export class Api {
    constructor(baseUrl, token) {
        this._baseUrl = baseUrl;
        this._token = token;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }


    getUserData() {
        return fetch(`${this._baseUrl}/users/me`, {
                headers: {
                    authorization: this._token
                }
            })
            .then(this._checkResponse)
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

        .then(this._checkResponse)
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
            .then(this._checkResponse)

    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
                headers: {
                    authorization: this._token
                }
            })
            .then(this._checkResponse)
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
            .then(this._checkResponse)
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: this._token
                }
            })
            .then(this._checkResponse)
    }

    addCardLike(id) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
                method: 'PUT',
                headers: {
                    authorization: this._token
                }
            })
            .then(this._checkResponse)
    }

    deleteCardLike(id) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: this._token
                }
            })
            .then(this._checkResponse)
    }

}