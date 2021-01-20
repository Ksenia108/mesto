export class UserInfo {
    constructor({ nameSelector, jobSelector }) {
        this._userName = document.querySelector(nameSelector);
        this._userJob = document.querySelector(jobSelector);
    }

    getUserInfo() {
        return { userJob: this._userJob, userName: this._userName };
    }

    setUserInfo(items) {
        this._userJob.textContent = items.jobInput;
        this._userName.textContent = items.personInput;
    }
}