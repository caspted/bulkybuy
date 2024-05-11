/* eslint-disable react/no-unescaped-entities */
"use client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

interface LoginCardProps {
  router : AppRouterInstance
}

export default function LoginCard({ router } : LoginCardProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("")
  const [displayEmailInvalid, setDisplayEmailInvalid] = useState<boolean>(false)
  const [displayEnterPassword, setDisplayEnterPassword] = useState<boolean>(false)
  const [incorrectCridentials, setIncorrectCridentials] = useState<boolean>(false)

  function isValidEmail() {
    const atIndex = email.indexOf('@');
    const dotIndex = email.lastIndexOf('.')

    if (atIndex && dotIndex) {
      if (dotIndex > atIndex) {
        return true
      }
    }

    return false
  }

  async function handleSubmit() {
    let valid = true

    if (!isValidEmail()) {
      setDisplayEmailInvalid(true)
      valid = false
    } else {
      setDisplayEmailInvalid(false)
    }

    if (password.length === 0) {
      setDisplayEnterPassword(true)
      valid = false
    } else {
      setDisplayEnterPassword(false)
    }

    if (!valid) {
      return
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })

      if (!response.ok || response.status === 401) {
        setIncorrectCridentials(true)
      } else {
        const responseBody = await response.json()
        localStorage.setItem('token', responseBody.body.token)
        router.push("/home")
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card className="w-[350px] border-none h-auto m-auto">
      <CardHeader>
        <CardTitle>Log In Account</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Your email"
                autoComplete="current-password"
                className="focus-visible:ring-grey-400"
                onChange={(e) => setEmail(e.target.value)}
              />
              {displayEmailInvalid && <p className="text-xs text-red-500 mr-1 my-2">Enter a valid email</p>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Your password"
                className="focus-visible:ring-grey-400"
                onChange={(e) => setPassword(e.target.value)}
              />
              {displayEnterPassword && <p className="text-xs text-red-500 mr-1 my-2">Enter your password</p>}
            </div>
          </div>
        </form>
        <div className="w-full flex">
          {incorrectCridentials && <p className="text-xs text-red-500 mx-auto mt-2">Password or username is incorrect</p>}
        </div>
      </CardContent>
      <div className="flex justify-center mb-2">
        <p className="text-xs mr-1">Don't have an account? </p>
        <Link
          className="text-blue-700 text-xs hover:underline hover:underline-offset-1 hover:decoration-blue-700"
          href={"../register"}
        >
          Register
        </Link>
      </div>
      <CardFooter className="flex flex-col justify-between">
        <Button className="w-full bg-black" onClick={() => handleSubmit()}>
          Log In
        </Button>
      </CardFooter>
    </Card>
  );
}
