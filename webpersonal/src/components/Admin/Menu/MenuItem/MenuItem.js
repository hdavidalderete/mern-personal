import React, { useState, useEffect } from "react";
import "./MenuItem.scss";
import { Icon, Confirm, Button } from "semantic-ui-react";
import { ENV } from "../../../../utils";
import { image } from "../../../../assets";
import { BasicModal } from "../../../Shared";
import { Menu } from "../../../../api/menu";
import { MenuForm } from "../MenuForm/MenuForm";
import { useAuth } from "../../../../hooks";

const menuController = new Menu();

export function MenuItem({ menu, onReload }) {
  const { accessToken } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [showConfirm, setShowConfirme] = useState(false);
  const [confirmMessage, setConfirnMessage] = useState("");
  const [isDelete, setIsDelete] = useState(false);

  const handleModal = () => setShowModal((prevState) => !prevState);

  const openUpdateMenu = () => {
    setTitleModal(`Actualizar menu`);
    handleModal();
  };

  const handleConfirmMenu = (isDelete) => {
    let message = `Esta seguro de eliminar el menu ${menu.title}`;
    if (!isDelete) {
      message = menu.active
        ? `Desactivar menu ${menu.title}`
        : `Activar menu ${menu.title}`;
    }
    setIsDelete(isDelete);
    setConfirnMessage(message);
    setShowConfirme((prevState) => !prevState);
  };

  const deleteMenu = async () => {
    try {
      await menuController.deleteMenu(accessToken, menu._id);
      setShowConfirme((prevState) => !prevState);
      onReload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleStateMenu = async () => {
    try {
      await menuController.updateMenu(accessToken, menu._id, {
        active: !menu.active,
      });
      setShowConfirme((prevState) => !prevState);
      onReload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="menu-item">
        <div className="menu-item__info">
          <span className="menu-item__info-title">{menu.title}</span>
          <span className="menu-item__info-path">{menu.path}</span>
        </div>
        <div>
          <Button icon primary onClick={openUpdateMenu}>
            <Icon name="pencil" />
          </Button>
          <Button
            icon
            color={menu.active ? "orange" : "teal"}
            onClick={() => handleConfirmMenu(false)}
          >
            <Icon name={menu.active ? "ban" : "check"} />
          </Button>
          <Button icon color="red" onClick={() => handleConfirmMenu(true)}>
            <Icon name="trash" />
          </Button>
        </div>
      </div>

      <BasicModal show={showModal} close={handleModal} title={titleModal}>
        <h1>Editar menu</h1>
        <MenuForm close={handleModal} onReload={onReload} menu={menu} />
      </BasicModal>

      <Confirm
        open={showConfirm}
        onCancel={() => setShowConfirme((prevState) => !prevState)}
        onConfirm={isDelete ? deleteMenu : handleStateMenu}
        content={confirmMessage}
        size="mini"
      />
    </>
  );
}
