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

interface RegisterCardProps {
  router: AppRouterInstance
}

export default function RegisterCard({ router } : RegisterCardProps) {
  const [username, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [displayEmailInvalid, setDisplayEmailInvalid] = useState<boolean>(false)
  const [displayEnterPassword, setDisplayEnterPassword] = useState<boolean>(false)
  const [displayEnterUsername, setDisplayEnterUsername] = useState<boolean>(false)
  const [displayEmailInUse, setDisplayEmailInUse] = useState<boolean>(false)

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

    if (username.length === 0) {
      setDisplayEnterUsername(true)
      valid = false
    } else {
      setDisplayEnterUsername(false)
    }

    if (!valid) {
      return
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/register`, {
        method: 'POST',      
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: username,
          email: email,
          password: password
        })
      })
      console.log(response)

      if (response.status === 409) {
        setDisplayEmailInUse(true)
      } else if (response.ok && response.status === 201) {
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
        <CardTitle>Make a New Account</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Username</Label>
              <Input
                id="name"
                placeholder="Your username"
                className="focus-visible:ring-grey-400"
                onChange={(e) => setUserName(e.target.value)}
              />
              {displayEnterUsername && <p className="text-xs text-red-500 mr-1 my-2">Enter a username</p>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Your email"
                className="focus-visible:ring-grey-400"
                onChange={(e) => setEmail(e.target.value)}
              />
              {displayEmailInvalid && <p className="text-xs text-red-500 mr-1 my-2">Enter a valid email</p>}
              {displayEmailInUse && <p className="text-xs text-red-500 mr-1 my-2">Email is already in use</p>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Your password"
                autoComplete="current-password"
                className="focus-visible:ring-grey-400"
                onChange={(e) => setPassword(e.target.value)}
              />
              {displayEnterPassword && <p className="text-xs text-red-500 mr-1 my-2">Enter a password</p>}
            </div>
          </div>
        </form>
      </CardContent>
      <div className="flex justify-center mb-2">
        <p className="text-xs mr-1">Already have an account? </p>
        <Link
          className="text-blue-700 text-xs hover:underline-offset-1 hover:underline hover:decoration-blue-900"
          href={"../login"}
        >
          Login
        </Link>
      </div>
      <CardFooter className="flex justify-between">
        <Button className="w-full bg-black" onClick={() => handleSubmit()}>
          Create New Account
        </Button>
      </CardFooter>
    </Card>
  );
}
