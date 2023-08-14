"use client";

import AuthModal from "../modal/auth-modal";
import LoginModal from "../modal/login-modal";

export const ModalProvider = () => {
  return (
    <>
      <AuthModal />
      <LoginModal />
    </>
  );
};
