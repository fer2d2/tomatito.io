export class User {
  id: string;
  name: string;
  avatar: string;
  email: string;
  provider: string;

  constructor(id: string, name: string, avatar: string, email: string, provider: string) {
    this.id = id;
    this.name = name;
    this.avatar = avatar;
    this.email = email;
    this.provider = provider;
  }
}
