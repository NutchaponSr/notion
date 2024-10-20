"use client";

import Link from "next/link";

import { z } from "zod";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { generateCode } from "@/lib/utils";

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

import { SignInSchema } from "@/features/auth/schemas";
import { FormError } from "@/components/form-error";

type SignIn = z.infer<typeof SignInSchema>;

export const SignInForm = () => {
  const searchParams = useSearchParams();

  const errorParam = searchParams?.get("error");
  
  const [isPending, setisPending] = useState(false);
  const [error, setError] = useState<string | undefined>("");

  const form = useForm<SignIn>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: generateCode(6),
    }
  });

  const onSubmit = async (value: SignIn) => {
    setError("");
    setisPending(true); 

    try {
      await signIn("credentials", {
        email: value.email,
        password: value.password,
        callbackUrl: "/",
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
                  className="h-9 text-sm"
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
                  className="h-9 text-sm"
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
        <Button size="lg" variant="link" type="button" className="w-full font-semibold" asChild>
          <Link href="/contact-admins">
            Don&apos;t have an account?
          </Link>
        </Button>
      </form>
    </Form>
  );
}