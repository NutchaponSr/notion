"use client";

import Link from "next/link";

import { z } from "zod";
import { Loader } from "lucide-react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { FormError } from "@/components/form-error";

import { SignInSchema } from "@/features/auth/schemas";

import { DEFAULT_SIGNIN_REDIRECT } from "../../../../routes";

type SignIn = z.infer<typeof SignInSchema>;

export const SignInForm = () => {
  const searchParams = useSearchParams();

  const errorParam = searchParams?.get("error");
  const callbackUrl = searchParams?.get("callbackUrl");
  
  const [isPending, setisPending] = useState(false);
  const [error, setError] = useState<string | undefined>("");

  const form = useForm<SignIn>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const onSubmit = async (value: SignIn) => {
    setError("");
    setisPending(true); 

    try {
      await signIn("credentials", {
        email: value.email,
        password: value.password,
        callbackUrl: callbackUrl || DEFAULT_SIGNIN_REDIRECT,
      });
    } catch {
      form.reset();
      setError("Something went wrong"); 
    } finally {
      setisPending(false); 
    }
  }

  useEffect(() => {
    if (errorParam) {
      setError("Invalid credentials");
    }
  }, [errorParam]);

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full"
      >
        <FormField 
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#787774]">Email</FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  type="email"
                  placeholder="john.doe@example.com"
                  className="h-9 text-sm text-[#1a1a1a]"
                  disabled={isPending}
                  autoFocus
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField 
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#787774]">Password</FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  type="password"
                  placeholder="******"
                  className="h-9 text-sm text-[#1a1a1a]"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="text-[#acaba9] text-xs">Use an organization email to easily collaborate</p>
        <Button size="lg" variant="primary" className="w-full" disabled={isPending}>
          {isPending && <Loader className="size-4 animate-spin" />}
          Continue
        </Button>
        <FormError message={error} />
        <Button size="lg" variant="link" type="button" className="w-full font-semibold text-[#1a1a1a]" asChild>
          <Link href="/contact-admins">
            Don&apos;t have an account?
          </Link>
        </Button>
      </form>
    </Form>
  );
}