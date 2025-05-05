"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { ActionState } from "@resume/auth/middleware";
import { signIn, signUp } from "@resume/auth/useAuth";
import { trpc } from "@/lib/trpc/client";

export default function LoginPage({
  mode = "signin",
}: {
  mode?: "signin" | "signup";
}) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    mode === "signin" ? signIn : signUp,
    { error: "" },
  );
  const ping = trpc.auth.ping.useQuery();

  return (
    <div className="flex h-screen w-full">
      {/* Left side - Illustration */}
      <div className="hidden w-1/2 bg-primary/10 lg:block">
        <div className="flex h-full items-center justify-center">
          <Image
            src="/login.png"
            alt="Login illustration"
            width={600}
            height={600}
            className="h-auto w-auto"
            priority
          />
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex w-full items-center justify-center lg:w-1/2">
        <div className="mx-auto w-full max-w-md space-y-8 px-4 md:px-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">
              {mode === "signin" ? "Welcome back" : "Create account"}
            </h1>
            <p className="text-muted-foreground">
              {mode === "signin"
                ? "Enter your credentials to sign in to your account"
                : "Fill up the form to create your account"}
            </p>
          </div>
          <p>ping: {ping.data}</p>

          <form className="space-y-6" action={formAction}>
            <div className="space-y-4">
              {mode === "signup" && (
                <div className="space-y-2">
                  <Label htmlFor="email">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="user name"
                    required
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  {mode === "signin" && (
                    <Link
                      href="/forgot-password"
                      className="text-sm text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  )}
                </div>
                <Input id="password" name="password" type="password" required />
              </div>
            </div>

            <Button type="submit" className="w-full">
              {mode === "signin" ? "Sign in" : "Sign up"}
            </Button>
          </form>

          <div className="text-center text-sm">
            {mode === "signin" ? (
              <>
                Don&apos;t have an account?{" "}
                <Link
                  href="/sign-up"
                  className="text-primary font-medium hover:underline"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="text-primary font-medium hover:underline"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
