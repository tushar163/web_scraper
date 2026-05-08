"use client";

import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Cookies from "js-cookie";
import Link from "next/link";
import { Button, Checkbox, Input, Label, toast } from '@heroui/react';
import { login } from '@/services/authService';

function Page() { // ✅ PascalCase component name
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(loginData);

            if (response?.success === true) {
                toast.success("Login successful");
                Cookies.set("token", response.token);
                Cookies.set("user", JSON.stringify(response.user));
                router.push("/stories"); 
            } else {

                toast.danger(response?.message || "Login failed. Please check your credentials.");
            }
        } catch (error) {
            toast.danger(error?.message || "An error occurred. Please try again later.");
            console.error("Login error:", error);
        }
    };

    return (
        <div className="flex h-full w-full items-center justify-center">
            <div className="flex w-full max-w-md flex-col gap-4 rounded-large px-8 pb-10 pt-6">
                <p className="pb-4 text-left text-3xl font-semibold">
                    Log In
                    <span aria-label="emoji" className="ml-2" role="img">
                        👋
                    </span>
                </p>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="input-type-email">Email</Label>
                        <Input
                            id="input-type-email"
                            placeholder="jane@example.com"
                            type="email"
                            name="email"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="input-type-password">Password</Label>
                        <Input
                            id="input-type-password"
                            placeholder="••••••••"
                            // ✅ Toggle password visibility using isVisible state
                            type={isVisible ? "text" : "password"}
                            name="password"
                            onChange={handleChange}
                            endContent={
                                <button type="button" onClick={toggleVisibility}>
                                    <Icon
                                        icon={isVisible ? "mdi:eye-off" : "mdi:eye"}
                                        className="text-default-400"
                                        width={20}
                                    />
                                </button>
                            }
                        />
                    </div>
                    <div className="flex items-center justify-between px-1 py-2">
                        <Checkbox id="remember-me" className="flex items-center gap-2">
                            <Checkbox.Control>
                                <Checkbox.Indicator />
                            </Checkbox.Control>
                            <Checkbox.Content>
                                <Label htmlFor="remember-me">Remember me</Label>
                            </Checkbox.Content>
                        </Checkbox>
                        <Link className="text-default-500 text-sm" href="#">
                            Forgot password?
                        </Link>
                    </div>
                    <Button color="primary" type="submit" className="text-white w-full">
                        Log In
                    </Button>
                    <Button
                        // variant="ghost"
                        color="primary"
                        onPress={() => router.push("/register")}
                    >
                        Register?
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Page;