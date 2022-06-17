import { atom } from "recoil";

export const loginPopupState = atom<boolean>({
  key: "loginPopupState",
  default: false,
});

export const sideBarOpenState = atom<boolean>({
  key: "sideBarOpenState",
  default: false,
});
