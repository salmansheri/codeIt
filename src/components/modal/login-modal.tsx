"use client";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import Modal from "./modal";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SignInType,
  SignInValidation,
} from "@/lib/validations/sign-in-validation";
import { useAuthModal } from "@/hooks/useAuthModal";
import { useLoginModal } from "@/hooks/useLoginModal";
import { signIn } from "next-auth/react";

const LoginModal = () => {
  const authModal = useAuthModal();
  const loginModal = useLoginModal();
  const [isMounted, setIsMounted] = useState(false);

  const form = useForm<SignInType>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",

      password: "",
    },
  });
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onSubmit = (data: SignInType) => {
    signIn("credentials", {
      email: data.email,
      password: data.password,
    });
  };
  const onClick = () => {
    loginModal.onClose();
    authModal.onOpen();
  };

  return (
    <Modal
      description="Sign in to Continue"
      title="Sign in"
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
    >
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-3"
          >
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter the Email" />
                  </FormControl>
                  <FormDescription>Enter the Email</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter the Password" />
                  </FormControl>
                  <FormDescription>Enter the Password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Button className="w-full lg:w-fit" type="submit">
                Sign in
              </Button>
            </div>
            <Separator className="my-3" />
            <div className="flex items-center justify-center w-full md:justify-start">
              <p>New to CodeIt!</p>
              <span
                className={cn(
                  buttonVariants({
                    variant: "link",
                  }),
                  "cursor-pointer"
                )}
                onClick={onClick}
              >
                Sign up
              </span>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

export default LoginModal;
