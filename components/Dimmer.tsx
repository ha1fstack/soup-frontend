import React from "react";

export const Dimmer = (props?: React.HTMLProps<HTMLDivElement>) => {
  return (
    <div
      css={{
        position: "fixed",
        backdropFilter: "blur(4px)",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        width: "100vw",
        height: "100vh",
        zIndex: 99999,
      }}
      {...props}
    />
  );
};
