import React from "react";

export function WebLayout(props) {
  const { children } = props;

  return (
    <div>
      <h2>WebLayout</h2>
      {children}
    </div>
  );
}
