import {AuthProviders, AuthMethods} from "angularfire2";

export const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyClxOwZ73f13fH6OIWD7MM9vpWWoeaBV5A',
  authDomain: 'tomatito-34f9b.firebaseapp.com',
  databaseURL: 'https://tomatito-34f9b.firebaseio.com',
  storageBucket: 'tomatito-34f9b.appspot.com',
  messagingSenderId: '575712903582'
};

export const FIREBASE_AUTH_CONFIG = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
};
