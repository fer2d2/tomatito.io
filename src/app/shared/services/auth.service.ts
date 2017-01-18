import {Injectable} from "@angular/core";
import {AngularFire, AuthProviders} from "angularfire2";

export const AUTH_METHODS = {
  TWITTER: AuthProviders.Twitter,
  FACEBOOK: AuthProviders.Facebook,
  GOOGLE: AuthProviders.Google,
  GITHUB: AuthProviders.Github,
  PASSWORD: AuthProviders.Password,
};

@Injectable()
export class AuthService {
  isAuth:boolean;
  user:any;

  constructor(public angularFire: AngularFire) {
    this.isAuth = false;
    this.user = {};

    this.angularFire.auth.subscribe(
      user => this._changeState(user),
      error => console.trace(error)
    );
  }

  public login(from: number) {
    this.angularFire.auth.login({
      provider: from
    });
  }

  public logout() {
    this.angularFire.auth.logout();
  }

  private _changeState(user: any = null) {
    if (user) {
      this.isAuth = true;
      this.user = this._getUserInfo(user)
    }
    else {
      this.isAuth = false;
      this.user = {};
    }
  }

  private _getUserInfo(user: any): any {
    if (!user) {
      return {};
    }
    let data = user.auth.providerData[0];
    return {
      id: data.uid,
      name: data.displayName,
      avatar: data.photoURL,
      email: data.email,
      provider: data.providerId
    };
  }
}
