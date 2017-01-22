import {Injectable} from "@angular/core";
import {AngularFire, AuthProviders} from "angularfire2";
import {User} from "../entities/user";
import {BehaviorSubject, Observable} from "rxjs";

export const AUTH_METHODS = {
  TWITTER: AuthProviders.Twitter,
  FACEBOOK: AuthProviders.Facebook,
  GOOGLE: AuthProviders.Google,
  GITHUB: AuthProviders.Github,
  PASSWORD: AuthProviders.Password,
};

@Injectable()
export class AuthService {
  authenticated:boolean;
  user:User;
  private _authenticationStatus: BehaviorSubject<boolean>;

  constructor(public angularFire: AngularFire) {
    this.authenticated = false;
    this.user = null;
    this._authenticationStatus = new BehaviorSubject<boolean>(false);

    this.angularFire.auth.subscribe(
      user => this.changeState(user),
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

  private changeState(externalServiceUser: any = null) {
    if (externalServiceUser) {
      this.authenticated = true;
      this.user = this.getUserInfo(externalServiceUser)
    }
    else {
      this.authenticated = false;
      this.user = null;
    }

    this._authenticationStatus.next(this.authenticated);
  }

  private getUserInfo(externalServiceUser: any): User {
    if (!externalServiceUser) {
      return null;
    }
    let userInfo = externalServiceUser.auth.providerData[0];

    return new User(userInfo.uid, userInfo.displayName, userInfo.avatar, userInfo.email, userInfo.providerId);
  }

  get authentication(): Observable<boolean> {
    return this._authenticationStatus.asObservable();
  }
}
