"use client";

import { useAuthModal } from "@/hooks/useAuthModal";
import { useLoginModal } from "@/hooks/useLoginModal";
import { createUser } from "@/lib/actions/user.actions";
import { cn } from "@/lib/utils";
import {
  SigninType,
  SigninValidation,
} from "@/lib/validations/sign-up-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SymbolIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import { toast } from "@/hooks/use-toast";

const AuthModal = () => {
  const authModal = useAuthModal();
  const loginModal = useLoginModal();

  const form = useForm<SigninType>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onSubmit = async (data: SigninType) => {
    const { message, error } = await createUser({
      name: data.name,
      email: data.email,
      imageUrl: data.imageUrl!,
      password: data.password,
    });

    if (error) {
      return toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    }

    if (message) {
      authModal.onClose();
      loginModal.onOpen();
      return toast({
        title: "Successfully Created User",
      });
    }
  };

  const onClick = () => {
    authModal.onClose();
    loginModal.onOpen();
  };

  const isLoading = form.formState.isSubmitting;
  return (
    <Modal
      isOpen={authModal.isOpen}
      onClose={authModal.onClose}
      description="Sign up to Continue"
      title="Sign up "
    >
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-3"
          >
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      {...field}
                      placeholder="Enter the name"
                    />
                  </FormControl>
                  <FormDescription>Enter the Username</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      {...field}
                      placeholder="Enter the Email"
                    />
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
                    <Input
                      disabled={isLoading}
                      {...field}
                      placeholder="Enter the Password"
                    />
                  </FormControl>
                  <FormDescription>Enter the Password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <Button
                disabled={isLoading}
                className="w-full lg:w-fit"
                type="submit"
              >
                {isLoading ? (
                  <>
                    <SymbolIcon className="h-4 w-4 mr-2 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>Sign up</>
                )}
              </Button>
            </div>
            <Separator className="my-3" />
            <div className="flex items-center justify-center w-full md:justify-start">
              <p>Already Have an Account?</p>
              <span
                onClick={onClick}
                className={cn(
                  buttonVariants({
                    variant: "link",
                  }),
                  "cursor-pointer"
                )}
              >
                Sign in
              </span>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

export default AuthModal;
