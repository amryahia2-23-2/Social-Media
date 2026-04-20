import { Input, Button, Select, SelectItem } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "../hooks/useRegister";
import { User, AtSign, Mail, Users, Calendar, KeyIcon, Eye, EyeOff } from "lucide-react";
import { registerSchema } from "../features/auth/authSchema";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            username: "",
            email: "",
            gender: "",
            dateOfBirth: "",
            password: "",
            rePassword: "",
        },
    });
    const registerMutation = useRegister();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const onSubmit = (data) => {
        registerMutation.mutate(data, {
            onSuccess: () => {
                navigate("/home");
            }
        });
    };

    return (

        <div>
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                Create a new account
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 mb-6">
                It is quick and easy.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                <Input
                    {...register("name")}
                    placeholder="Full name"
                    radius="lg"
                    startContent={<User className="text-gray-400" size={20} />}
                    isInvalid={!!errors.name}
                    errorMessage={errors.name?.message}
                    classNames={{
                        inputWrapper:
                            "bg-[#e6eaef] dark:bg-black/30 p-4 border-0 shadow-none focus-within:ring-2 focus-within:ring-blue-400 dark:focus-within:ring-[#610094]",
                        input: "dark:text-white dark:placeholder:text-gray-500",
                    }}
                />

                <Input
                    {...register("username")}
                    placeholder="Username (optional)"
                    radius="lg"
                    startContent={<AtSign className="text-gray-400" size={20} />}
                    classNames={{
                        inputWrapper:
                            "bg-[#e6eaef] dark:bg-black/30 border-0 shadow-none focus-within:ring-2 focus-within:ring-blue-400 dark:focus-within:ring-[#610094]",
                        input: "dark:text-white dark:placeholder:text-gray-500",
                    }}
                />

                <Input
                    {...register("email")}
                    type="email"
                    placeholder="Email address"
                    radius="lg"
                    startContent={<Mail className="text-gray-400" size={20} />}
                    isInvalid={!!errors.email}
                    errorMessage={errors.email?.message}
                    classNames={{
                        inputWrapper:
                            "bg-[#e6eaef] dark:bg-black/30 border-0 shadow-none focus-within:ring-2 focus-within:ring-blue-400 dark:focus-within:ring-[#610094]",
                        input: "dark:text-white dark:placeholder:text-gray-500",
                    }}
                />

                <Select
                    {...register("gender")}
                    label="gender"
                    placeholder="Select gender"
                    size="sm"
                    radius="full"
                    variant="flat"
                    startContent={<Users className="text-gray-400" size={20} />}
                    isInvalid={!!errors.gender}
                    errorMessage={errors.gender?.message}
                    classNames={{
                        base: "w-full",
                        trigger:
                            "bg-[#e6eaef] dark:bg-black/30 border-0 shadow-none h-[48px] rounded-xl px-4 data-[hover=true]:bg-[#e6eaef] dark:data-[hover=true]:bg-black/40",
                        value: "text-gray-700 dark:text-gray-300",
                        popoverContent: "rounded-xl dark:bg-[#030637] dark:border dark:border-[#3F0071]",
                        listbox: "dark:bg-[#030637]",
                    }}
                >
                    <SelectItem key="male" classNames={{ base: "dark:text-gray-200 dark:data-[hover=true]:bg-[#3F0071]/30" }}>Male</SelectItem>
                    <SelectItem key="female" classNames={{ base: "dark:text-gray-200 dark:data-[hover=true]:bg-[#3F0071]/30" }}>Female</SelectItem>
                </Select>

                <Input
                    {...register("dateOfBirth")}
                    type="date"
                    radius="lg"
                    startContent={<Calendar className="text-gray-400" size={20} />}
                    isInvalid={!!errors.dateOfBirth}
                    errorMessage={errors.dateOfBirth?.message}
                    classNames={{
                        inputWrapper:
                            "bg-[#e6eaef] dark:bg-black/30 border-0 shadow-none focus-within:ring-2 focus-within:ring-blue-400 dark:focus-within:ring-[#610094]",
                        input: "dark:text-white dark:placeholder:text-gray-500",
                    }}
                />

                <Input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    radius="lg"
                    startContent={<KeyIcon className="text-gray-400" size={20} />}
                    endContent={
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="focus:outline-none"
                        >
                            {showPassword ? (
                                <EyeOff className="text-gray-400" size={20} />
                            ) : (
                                <Eye className="text-gray-400" size={20} />
                            )}
                        </button>
                    }
                    isInvalid={!!errors.password}
                    errorMessage={errors.password?.message}
                    classNames={{
                        inputWrapper:
                            "bg-[#e6eaef] dark:bg-black/30 border-0 shadow-none focus-within:ring-2 focus-within:ring-blue-400 dark:focus-within:ring-[#610094]",
                        input: "dark:text-white dark:placeholder:text-gray-500",
                    }}
                />

                <Input
                    {...register("rePassword")}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    radius="lg"
                    startContent={<KeyIcon className="text-gray-400" size={20} />}
                    endContent={
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="focus:outline-none"
                        >
                            {showConfirmPassword ? (
                                <EyeOff className="text-gray-400" size={20} />
                            ) : (
                                <Eye className="text-gray-400" size={20} />
                            )}
                        </button>
                    }
                    isInvalid={!!errors.rePassword}
                    errorMessage={errors.rePassword?.message}
                    classNames={{
                        inputWrapper:
                            "bg-[#e6eaef] dark:bg-black/30 border-0 shadow-none focus-within:ring-2 focus-within:ring-blue-400 dark:focus-within:ring-[#610094]",
                        input: "dark:text-white dark:placeholder:text-gray-500",
                    }}
                />

                <Button
                    type="submit"
                    isLoading={registerMutation.isPending}
                    className="w-full bg-[#001F6B] dark:bg-[#610094] hover:bg-[#0b2672] hover:dark:bg-[#610094] hover:dark:shadow-lg hover:dark:shadow-[#610094]/50 text-white rounded-xl py-6 text-base font-extrabold transition"
                >
                    Create New Account
                </Button>

            </form>
        </div>
    );
}