"use client";

import Link from "next/link";

import { z } from "zod";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
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

import { SignUpSchema } from "@/features/auth/schemas";
import { useSignUp } from "../api/use-sign-up";

type SignUp = z.infer<typeof SignUpSchema>;

export const SignUpForm = () => {
  const { mutate: signUp, isPending } = useSignUp();

  const form = useForm<SignUp>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: generateCode(6),
    }
  });

  const onSubmit = (value: SignUp) => {
    signUp({ json: value }, {
      onSuccess: () => {
        form.reset();
      }
    });
  }

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full"
      >
        <FormField 
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#787774]">Username</FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  type="text"
                  placeholder="e.g. John Doe"
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#787774]">Work email</FormLabel>
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
        <p className="text-[#acaba9] text-xs">Use an organization email to easily collaborate</p>
        <Button size="lg" variant="primary" className="w-full" disabled={isPending}>
          {isPending && <Loader className="size-4 animate-spin" />}
          Continue
        </Button>
        <Button size="lg" variant="link" type="button" className="w-full font-semibold" asChild>
          <Link href="/sign-in">
            Already have an account?
          </Link>
        </Button>
      </form>
    </Form>
  );
}