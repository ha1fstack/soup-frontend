import { atom } from "recoil";

export const loginPopupState = atom<boolean>({
  key: "loginPopupState",
  default: false,
});
