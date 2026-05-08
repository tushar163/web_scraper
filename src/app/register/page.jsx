"use client";
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Link from "next/link";
import { Button, Checkbox, Input, Label, toast } from '@heroui/react';
import { register } from '@/services/authService';

function Page() {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);
    const [isConfirmVisible, setIsConfirmVisible] = useState(false); 
    const [isLoading, setIsLoading] = useState(false);
    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "", 
    });

    const toggleVisibility = () => setIsVisible(!isVisible);
    const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible); 

    const handleChange = (e) => {
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value,
        });
    };

    
    const passwordMismatch =
        registerData.confirmPassword.length > 0 &&
        registerData.password !== registerData.confirmPassword;

    const handleSubmit = async (e) => {
        e.preventDefault();

       
        if (registerData.password !== registerData.confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        setIsLoading(true);
        try {
            
            const { confirmPassword, ...payload } = registerData;
            const response = await register(payload);

            if (response?.success === true) {
                toast.success("Account created successfully!");
                router.push("/login");
            } else {
                toast.error(response?.message || "Registration failed. Please try again.");
            }
        } catch (error) {
            toast.error(error?.message || "An error occurred. Please try again later.");
            console.error("Register error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-full w-full items-center justify-center">
            <div className="flex w-full max-w-md flex-col gap-4 rounded-large px-8 pb-10 pt-6">
                <p className="pb-4 text-left text-3xl font-semibold">
                    Create Account
                    <span aria-label="emoji" className="ml-2" role="img">
                        ✍️
                    </span>
                </p>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="input-name">Full Name</Label>
                        <Input
                            id="input-name"
                            placeholder="Jane Doe"
                            type="text"
                            name="name"
                            onChange={handleChange}
                            startContent={
                                <Icon icon="mdi:account-outline" className="text-default-400" width={20} />
                            }
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <Label htmlFor="input-email">Email</Label>
                        <Input
                            id="input-email"
                            placeholder="jane@example.com"
                            type="email"
                            name="email"
                            onChange={handleChange}
                            startContent={
                                <Icon icon="mdi:email-outline" className="text-default-400" width={20} />
                            }
                        />
                    </div>

                    
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="input-password">Password</Label>
                        <Input
                            id="input-password"
                            placeholder="••••••••"
                            type={isVisible ? "text" : "password"}
                            name="password"
                            onChange={handleChange}
                            startContent={
                                <Icon icon="mdi:lock-outline" className="text-default-400" width={20} />
                            }
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

                   
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="input-confirm-password">Confirm Password</Label>
                        <Input
                            id="input-confirm-password"
                            placeholder="••••••••"
                            type={isConfirmVisible ? "text" : "password"}
                            name="confirmPassword"
                            onChange={handleChange}
                            
                            color={passwordMismatch ? "danger" : "default"}
                            startContent={
                                <Icon
                                    icon="mdi:lock-check-outline"
                                    className={passwordMismatch ? "text-danger" : "text-default-400"}
                                    width={20}
                                />
                            }
                            endContent={
                                <button type="button" onClick={toggleConfirmVisibility}>
                                    <Icon
                                        icon={isConfirmVisible ? "mdi:eye-off" : "mdi:eye"}
                                        className="text-default-400"
                                        width={20}
                                    />
                                </button>
                            }
                        />
                      
                        {passwordMismatch && (
                            <span className="text-danger text-xs mt-1 flex items-center gap-1">
                                <Icon icon="mdi:alert-circle-outline" width={14} />
                                Passwords do not match
                            </span>
                        )}
                    </div>

                    {/* Terms */}
                    <div className="flex items-center px-1 py-2">
                        <Checkbox id="terms" className="flex items-center gap-2">
                            <Checkbox.Control>
                                <Checkbox.Indicator />
                            </Checkbox.Control>
                            <Checkbox.Content>
                                <Label htmlFor="terms" className="text-sm">
                                    I agree to the{" "}
                                    <Link href="#" className="text-primary text-sm hover:underline">
                                        Terms & Conditions
                                    </Link>
                                </Label>
                            </Checkbox.Content>
                        </Checkbox>
                    </div>

                  
                    <Button
                        color="primary"
                        type="submit"
                        className="text-white w-full"
                        isLoading={isLoading}
                        isDisabled={passwordMismatch} 
                    >
                        Create Account
                    </Button>

                   
                    <Button
                        color="primary"
                        variant="ghost"
                        onPress={() => router.push("/login")}
                    >
                        Already have an account? Log In
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Page;