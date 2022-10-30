import {observer} from 'mobx-react-lite';
import React, { useState } from "react";
import { UserStoreImpl } from "../store/user";

interface UserProps {
  userStore: UserStoreImpl
}

export const Child:React.FC<UserProps> = observer(({userStore}) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
     <div>
      <input
        value={username}
        type="text"
        placeholder="username"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <input
        value={password}
        type="password"
        placeholder="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button onClick={() => {userStore.addUser(username, password)}}>Login</button>

      <ul>
        {userStore.users.map(user => {
          return <li>{user.username}:{user.password}</li>;
        })}
      </ul>
    
    </div>
  );
});

export default Child;
