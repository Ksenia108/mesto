export class UserInfo {
    constructor({ nameSelector, jobSelector, avatarSelector }) {
        this._userName = document.querySelector(nameSelector);
        this._userJob = document.querySelector(jobSelector);
        this._userAvatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return { userJob: this._userJob.textContent, userName: this._userName.textContent };

    }

    setUserAvatar(items) {
        this._userAvatar.src = items.avatar;
    }

    setUserInfo(items) {
        this._userJob.textContent = items.about;
        this._userName.textContent = items.name;
    }


}