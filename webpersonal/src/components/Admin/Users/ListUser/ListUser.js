import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { size, map } from "lodash";
import "./ListUser.scss";
import { User } from "../../../../api/user";
import { useAuth } from "../../../../hooks";
import { UserItem } from "../UserItem";

const userController = new User();

export function ListUser({ userActive, reload, onReload }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setUsers(null);
        const response = await userController.getUsers(accessToken, userActive);
        setUsers(response.users);
      } catch (error) {}
    })();
  }, [userActive, reload]);
  const { accessToken } = useAuth();

  if (!users) return <Loader active inline="centered" />;
  if (size(users) === 0) return "No se encontraron usuarios";

  return map(users, (user) => <UserItem key={user._id} user={user} onReload={onReload}/>);
}
