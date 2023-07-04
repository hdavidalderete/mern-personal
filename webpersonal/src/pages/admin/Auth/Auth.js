import React, { useState } from "react";
import { Tab } from "semantic-ui-react";
import { Icon } from "../../../assets";
import "./Auth.scss";
import { RegisterForm, LoginForm } from "../../../components/Admin/Auth";

export function Auth() {
  const [activeIndex, setactiveIndex] = useState(0);

  const openLogin = () => setactiveIndex(0);
  const panes = [
    {
      menuItem: "Entrar",
      render: () => (<Tab.Pane><LoginForm openLogin={openLogin} /></Tab.Pane>),
    },
    {
      menuItem: "Nuevo Usuario",
      render: () => (
        <Tab.Pane>
          <RegisterForm openLogin={openLogin} />
        </Tab.Pane>
      ),
    },
  ];
  return (
    <div className="auth">
      <Icon.LogoWhite className="logo" />
      <Tab
        panes={panes}
        className="auth__forms"
        activeIndex={activeIndex}
        onTabChange={(_, { activeIndex }) => setactiveIndex(activeIndex)}
      />
    </div>
  );
}
