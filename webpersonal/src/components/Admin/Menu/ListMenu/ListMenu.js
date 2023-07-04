import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { size, map } from "lodash";
import "./ListMenu.scss";
import { Menu } from "../../../../api/menu";
import { MenuItem } from "../MenuItem";

const menuController = new Menu();

export function ListMenu({ menuActive, reload, onReload }) {
  const [menus, setMenus] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setMenus(null);
        const response = await menuController.getMenus(menuActive);
        setMenus(response.menu);
      } catch (error) {}
    })();
  }, [menuActive, reload]);

  if (!menus) return <Loader active inline="centered" />;
  if (size(menus) === 0) return "No se encontraron menus";
  return map(menus, (menu) => (
    <MenuItem key={menu._id} menu={menu} onReload={onReload} />
  ));
}
