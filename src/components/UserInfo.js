export default class UserInfo {
  constructor(usernameSelector, aboutSelector) {
    this._username = document.querySelector(usernameSelector);
    this._about = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    const userData = {
      username: this._username.textContent,
      about: this._about.textContent
    }
    return userData;
  }

  setUserInfo(userData) {
    this._username.textContent = userData.username;
    this._about.textContent = userData.about;
  }
}