import { action, makeObservable, observable } from "mobx";

interface UserItem {
  username: string;
  password: string;
}

export class UserStoreImpl {
  users: UserItem[] = [];

  constructor() {
    makeObservable(this, {
      users: observable,
      addUser: action
    });
  }

  addUser(username: string, password: string) {
    const item: UserItem = {
      username,
      password,
    };
    this.users.push(item)
  }
}


export const UserStore = new UserStoreImpl()