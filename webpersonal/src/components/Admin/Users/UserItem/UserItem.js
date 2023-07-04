import React, { useState, useEffect } from "react";
import "./UserItem.scss";
import { Image, Button, Icon, Confirm } from "semantic-ui-react";
import { ENV } from "../../../../utils";
import { image } from "../../../../assets";
import { BasicModal } from "../../../Shared";
import { User } from "../../../../api/user";
import { UserForm } from "../UserForm/UserForm";
import { useAuth } from "../../../../hooks";

const userController = new User();

export function UserItem({ user, onReload }) {
  const { accessToken } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [showConfirm, setShowConfirme] = useState(false);
  const [confirmMessage, setConfirnMessage] = useState("");
  const [isDelete, setIsDelete] = useState(false);

  const handleModal = () => setShowModal((prevState) => !prevState);

  const openUpdateUser = () => {
    setTitleModal(`Actualizar ${user.email}`);
    handleModal();
  };

  const handleConfirmUser = (isDelete) => {
    let message = `Esta seguro de eliminar el usuario ${user.email}`;

    if (!isDelete) {
      message = user.active
        ? `Desactivar usuario ${user.email}`
        : `Activar usuario ${user.email}`;
    }
    setIsDelete(isDelete);
    setConfirnMessage(message);
    setShowConfirme((prevState) => !prevState);
  };

  const deleteUser = async () => {
    try {
      await userController.deleteUser(accessToken, user._id);
      setShowConfirme((prevState) => !prevState);
      onReload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleStateUser = async () => {
    try {
      await userController.updateUser(accessToken, user._id, {
        active: !user.active,
      });
      setShowConfirme((prevState) => !prevState);
      onReload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="user-item">
        <div className="user-item__info">
          <Image
            avatar
            src={
              user.avatar ? `${ENV.BASE_PATH}/${user.avatar}` : image.noAvatar
            }
          />
          <div>
            <p>
              {user.firstName} {user.lastName}
            </p>
            <p>{user.email}</p>
          </div>
        </div>
        <div>
          <Button icon primary onClick={openUpdateUser}>
            <Icon name="pencil" />
          </Button>
          <Button
            icon
            color={user.active ? "orange" : "teal"}
            onClick={() => handleConfirmUser(false)}
          >
            <Icon name={user.active ? "ban" : "check"} />
          </Button>
          <Button icon color="red" onClick={() => handleConfirmUser(true)}>
            <Icon name="trash" />
          </Button>
        </div>
      </div>

      <BasicModal show={showModal} close={handleModal} title={titleModal}>
        <h1>Editar usuario</h1>
        <UserForm close={handleModal} onReload={onReload} user={user} />
      </BasicModal>

      <Confirm
        open={showConfirm}
        onCancel={() => setShowConfirme((prevState) => !prevState)}
        onConfirm={isDelete ? deleteUser : handleStateUser}
        content={confirmMessage}
        size="mini"
      />
    </>
  );
}
