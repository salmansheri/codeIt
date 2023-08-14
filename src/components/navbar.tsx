"use client";

import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { useAuthModal } from "@/hooks/useAuthModal";
import { UserType } from "@/lib/types";
import { signOut } from "next-auth/react";

interface NavbarProps {
  currentUser?: UserType;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const authModal = useAuthModal();
  return (
    <header className="flex items-center justify-between sm:px-12 px-2 md:px-24 ">
      <div>
        <Link
          className="flex items-center justify-center h-20 text-white text-3xl "
          href="/"
        >
          CodeIt!
        </Link>
      </div>
      <nav>
        {currentUser?.email ? (
          <Button onClick={() => signOut()}>Sign out</Button>
        ) : (
          <Button onClick={authModal.onOpen}>Sign in</Button>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
