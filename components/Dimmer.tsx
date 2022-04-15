import { Interpolation, Theme } from "@emotion/react";
import React from "react";
import ReactDOM from "react-dom";
import Portal from "./Portal";

export const Dimmer = ({
  ...props
}: React.ComponentProps<"div"> & {
  css?: Interpolation<Theme>;
}) => {
  return (
    <Portal at={"#portal"}>
      <div
        css={{
          position: "fixed",
          top: 0,
          left: 0,
          backdropFilter: "blur(4px)",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          width: "100vw",
          height: "100vh",
          zIndex: 99999,
        }}
        {...props}
      />
    </Portal>
  );
};
