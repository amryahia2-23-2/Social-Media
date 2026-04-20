import { Input, Button, Card, CardBody } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../hooks/useLogin"; // hook مربوط بالـ API
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { loginSchema } from "../features/auth/authSchema";
import { useState } from "react";

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "mohamed+22@gmail.com",
            password: "Mohamed@1234",
        },
    });
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const loginMutation = useLogin();

    const onSubmit = (data) => {
        loginMutation.mutate(data, {
            onSuccess: () => {
                navigate("/home");
            }
        });
    };

    return (
        <div>
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                Log in to Route Social
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 mb-6">
                Log in and continue your social journey.
            </p>
            {/* Login Card */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                    {...register("email")}
                    type="email"
                    placeholder="Email address"
                    aria-label="Email address"
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
                <Input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    aria-label="Password"
                    radius="lg"
                    startContent={<Lock className="text-gray-400" size={20} />}
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


                <Button
                    type="submit"
                    className="w-full rounded-2xl bg-[#001F6B] dark:bg-[#610094] hover:dark:bg-[#610094] hover:dark:shadow-lg hover:dark:shadow-[#610094]/50 text-white font-extrabold transition"
                    isLoading={loginMutation.isPending}
                >
                    Log In
                </Button>
            </form>
        </div>
    );
}