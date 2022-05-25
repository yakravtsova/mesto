export default class UserInfo {
  constructor(usernameSelector, aboutSelector, avatarSelector) {
    this._username = document.querySelector(usernameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const userData = {
      name: this._username.textContent,
      about: this._about.textContent
    }
    return userData;
  } 

  setUserInfo({name, about}) {
    this._username.textContent = name;
    this._about.textContent = about;
  }

  setAvatar({avatar}) {
    this._avatar.src = avatar;
  }
}