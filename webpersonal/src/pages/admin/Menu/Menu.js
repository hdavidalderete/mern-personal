import React, { useState } from "react";
import { Tab, Button } from "semantic-ui-react";
import "./Menu.scss";
import { BasicModal } from "../../../components/Shared";
import { ListMenu, MenuForm } from "../../../components/Admin/Menu";

export function Menu() {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);

  const onReload = () => setReload((prevState) => !prevState);

  const panes = [
    {
      menuItem: "Menus activos",
      render: () => (
        <Tab.Pane attached={false}>
          <ListMenu menuActive={true} reload={reload} onReload={onReload}/>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Menus inactivo",
      render: () => (
        <Tab.Pane attached={false}>
          <ListMenu menuActive={false} reload={reload} onReload={onReload}/>
        </Tab.Pane>
      ),
    },
  ];
  return (
    <>
      <div className="menu-page">
        <Button className="menu-page__add" primary onClick={onOpenCloseModal}>
          Nuevo Menu
        </Button>
      </div>
      <Tab menu={{ secondary: true }} panes={panes} />

      <BasicModal
        show={showModal}
        close={onOpenCloseModal}
        title="crear menu"
      >
        <MenuForm close={onOpenCloseModal} onReload={onReload} />
      </BasicModal>
    </>
  );
}
