"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "~/components/ui/input-otp";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { ArrowLeft, ChevronRightIcon } from "lucide-react";
import { BrandLogo } from "~/components/brand-icon";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [authMethod, setAuthMethod] = useState<"login" | "signup">("login");
  const [showOTP, setShowOTP] = useState(false);
  const [showProfiles, setShowProfiles] = useState(false);
  const router = useRouter();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setShowOTP(true);
  };

  const handleOTPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would verify the OTP
    console.log("OTP submitted");
    setShowOTP(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would verify the login credentials
    setShowProfiles(true);
  };

  const handleProfileSelect = (profile: string) => {
    console.log(`Selected profile: ${profile}`);
    // Here you would handle the profile selection
  };

  const handleBack = () => {
    if (showProfiles) {
      setShowProfiles(false);
    } else if (showOTP) {
      setShowOTP(false);
    } else {
      router.push("/");
    }
  };

  const profiles = [
    {
      name: "Oswaldo Tedesco",
      email: "m@example.com",
      role: "Owner",
      organization: null,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Oswaldo Tedesco",
      email: "p@example.com",
      role: "Admin",
      organization: "Century 21",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ];

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-2 sm:p-4">
      <div className="absolute inset-0 z-0 h-full w-full bg-gradient-to-br from-primary/20 via-background to-secondary/20">
        <div className="bg-[url('data:image/svg+xml;charset=utf-8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><g fill-opacity=%22.1%22><circle r=%2220%22 cx=%2221%22 cy=%2220%22 /><circle r=%2245%22 cx=%2270%22 cy=%2270%22 /><circle r=%2230%22 cx=%2250%22 cy=%2250%22 /></g></svg>')] animate-subtle-drift absolute inset-0 bg-[length:100px_100px]"></div>
      </div>
      <Card className="z-10 w-full max-w-[95%] overflow-hidden sm:max-w-md">
        <div className="flex items-center justify-between px-6 pt-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <BrandLogo />
          <div className="w-8" /> {/* Spacer for centering */}
        </div>
        <CardHeader className="space-y-1 p-4 sm:p-6">
          <CardTitle className="text-center text-xl font-bold sm:text-2xl">
            Welcome
          </CardTitle>
          <CardDescription className="text-center text-xs sm:text-sm">
            {showOTP
              ? "Enter the OTP sent to your email"
              : showProfiles
                ? "Select your profile to continue"
                : "Sign in to your account or create a new one"}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          {showProfiles ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center space-y-4"
            >
              {profiles.map((profile) => (
                <Button
                  key={profile.email}
                  variant="outline"
                  className="h-20 w-full max-w-[280px] justify-between px-4 py-4 text-left transition-colors duration-200 hover:bg-secondary"
                  onClick={() => handleProfileSelect(profile.name)}
                >
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={profile.avatar} alt={profile.name} />
                      <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">
                        {profile.name}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {profile.organization ?? "Personal"}
                      </p>
                    </div>
                  </div>
                  <div className="text-xs font-medium text-muted-foreground">
                    {profile.role}
                  </div>
                </Button>
              ))}
            </motion.div>
          ) : !showOTP ? (
            <Tabs
              value={authMethod}
              onValueChange={(value) =>
                setAuthMethod(value as "login" | "signup")
              }
              className="w-full"
            >
              <TabsList className="mb-4 grid w-full grid-cols-2">
                <TabsTrigger value="login">Log In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              <div className="relative h-[280px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={authMethod}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0"
                  >
                    {authMethod === "login" ? (
                      <form
                        onSubmit={handleLogin}
                        className="space-y-3 sm:space-y-4"
                      >
                        <div className="space-y-1 sm:space-y-2">
                          <Label
                            htmlFor="login-email"
                            className="text-xs sm:text-sm"
                          >
                            Email address
                          </Label>
                          <Input
                            id="login-email"
                            type="email"
                            placeholder="you@example.com"
                            required
                            className="text-sm sm:text-base"
                          />
                        </div>
                        <div className="space-y-1 sm:space-y-2">
                          <Label
                            htmlFor="login-password"
                            className="text-xs sm:text-sm"
                          >
                            Password
                          </Label>
                          <Input
                            id="login-password"
                            type="password"
                            required
                            className="text-sm sm:text-base"
                          />
                        </div>
                        <Button
                          type="submit"
                          className="group mt-2 w-full py-2 text-sm sm:py-3 sm:text-base"
                        >
                          Log In
                          <ChevronRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </form>
                    ) : (
                      <form
                        onSubmit={handleSignUp}
                        className="space-y-3 sm:space-y-4"
                      >
                        <div className="space-y-1 sm:space-y-2">
                          <Label
                            htmlFor="signup-email"
                            className="text-xs sm:text-sm"
                          >
                            Email address
                          </Label>
                          <Input
                            id="signup-email"
                            type="email"
                            placeholder="you@example.com"
                            required
                            className="text-sm sm:text-base"
                          />
                        </div>
                        <div className="space-y-1 sm:space-y-2">
                          <Label
                            htmlFor="signup-password"
                            className="text-xs sm:text-sm"
                          >
                            Password
                          </Label>
                          <Input
                            id="signup-password"
                            type="password"
                            required
                            className="text-sm sm:text-base"
                          />
                        </div>
                        <div className="space-y-1 sm:space-y-2">
                          <Label
                            htmlFor="confirm-password"
                            className="text-xs sm:text-sm"
                          >
                            Confirm Password
                          </Label>
                          <Input
                            id="confirm-password"
                            type="password"
                            required
                            className="text-sm sm:text-base"
                          />
                        </div>
                        <Button
                          type="submit"
                          className="group mt-2 w-full py-2 text-sm sm:py-3 sm:text-base"
                        >
                          Sign Up
                          <ChevronRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </form>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </Tabs>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center"
            >
              <form
                onSubmit={handleOTPSubmit}
                className="w-full max-w-[250px] space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="otp" className="block text-center text-sm">
                    Enter OTP
                  </Label>
                  <InputOTP maxLength={6}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>

                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <Button type="submit" className="group w-full">
                  Verify OTP
                  <ChevronRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </form>
            </motion.div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center p-4 sm:p-6">
          <p className="text-center text-[10px] text-muted-foreground sm:text-xs">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
