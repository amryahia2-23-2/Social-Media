import { useState, useEffect } from "react";
import { Input, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/react";
import { Lock, Eye, EyeOff, ArrowLeft, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { changePasswordSchema } from "../features/auth/authSchema";
import { useChangePassword } from "../hooks/useChangePassword";
import { useUser } from "../hooks/useUser";

export default function SettingsPage() {
    const navigate = useNavigate();
    const { logout } = useUser();
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [countdown, setCountdown] = useState(3);

    // Handle logout after password change
    const handleLogoutAfterChange = () => {
        setShowLogoutModal(true);
        setCountdown(3);
    };

    const { handleChangePassword, isLoading } = useChangePassword(handleLogoutAfterChange);

    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    // Countdown timer for auto logout
    useEffect(() => {
        if (showLogoutModal && countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (showLogoutModal && countdown === 0) {
            handleLogout();
        }
    }, [showLogoutModal, countdown]);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        // Validate with Zod schema
        const result = changePasswordSchema.safeParse(formData);

        if (!result.success) {
            // Extract errors from Zod
            const fieldErrors = {};
            result.error.errors.forEach((err) => {
                fieldErrors[err.path[0]] = err.message;
            });
            setErrors(fieldErrors);
            return;
        }

        // Submit
        handleChangePassword({
            password: formData.currentPassword,
            newPassword: formData.newPassword
        });

        // Clear form on success
        setFormData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black py-8">
            <div className="max-w-2xl mx-auto px-4">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center space-x-2 mb-6 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
                >
                    <ArrowLeft size={20} />
                    <span>Back</span>
                </button>

                {/* Settings Card */}
                <div className="bg-white dark:bg-[#030637] rounded-2xl shadow-sm p-8 border dark:border-[#610094]/30">
                    {/* Header */}
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="p-3 bg-blue-100 dark:bg-[#610094]/20 rounded-full">
                            <Lock size={24} className="text-blue-600 dark:text-[#610094]" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Change Password</h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Update your account password</p>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Current Password */}
                        <div>
                            <Input
                                placeholder="Current Password"
                                type={showCurrentPassword ? "text" : "password"}
                                value={formData.currentPassword}
                                onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                                aria-label="Current Password"
                                isInvalid={!!errors.currentPassword}
                                endContent={
                                    <button
                                        type="button"
                                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                        className="focus:outline-none"
                                        aria-label="Toggle current password visibility"
                                    >
                                        {showCurrentPassword ? (
                                            <EyeOff size={20} className="text-gray-400" />
                                        ) : (
                                            <Eye size={20} className="text-gray-400" />
                                        )}
                                    </button>
                                }
                            />
                            {errors.currentPassword && (
                                <p className="text-red-500 text-xs mt-1">{errors.currentPassword}</p>
                            )}
                        </div>

                        {/* New Password */}
                        <div>
                            <Input
                                placeholder="New Password"
                                type={showNewPassword ? "text" : "password"}
                                value={formData.newPassword}
                                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                aria-label="New Password"
                                isInvalid={!!errors.newPassword}
                                endContent={
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        className="focus:outline-none"
                                        aria-label="Toggle new password visibility"
                                    >
                                        {showNewPassword ? (
                                            <EyeOff size={20} className="text-gray-400" />
                                        ) : (
                                            <Eye size={20} className="text-gray-400" />
                                        )}
                                    </button>
                                }
                            />
                            {errors.newPassword && (
                                <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>
                            )}
                        </div>

                        {/* Confirm New Password */}
                        <div>
                            <Input
                                placeholder="Confirm New Password"
                                type={showConfirmPassword ? "text" : "password"}
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                aria-label="Confirm New Password"
                                isInvalid={!!errors.confirmPassword}
                                endContent={
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="focus:outline-none"
                                        aria-label="Toggle confirm password visibility"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff size={20} className="text-gray-400" />
                                        ) : (
                                            <Eye size={20} className="text-gray-400" />
                                        )}
                                    </button>
                                }
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                            )}
                        </div>

                        {/* Password Requirements */}
                        <div className="bg-blue-50 dark:bg-[#610094]/10 rounded-lg p-4 border dark:border-[#610094]/30">
                            <p className="text-sm font-semibold text-blue-900 dark:text-[#610094] mb-2">Password Requirements:</p>
                            <ul className="text-xs text-blue-700 dark:text-gray-300 space-y-1">
                                <li>• At least 8 characters long</li>
                                <li>• At least one uppercase letter</li>
                                <li>• At least one lowercase letter</li>
                                <li>• At least one number</li>
                                <li>• At least one special character (@$!%*?&)</li>
                                <li>• Different from your current password</li>
                            </ul>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            color="primary"
                            size="lg"
                            className="w-full bg-[#610094] hover:bg-[#610094] hover:shadow-lg hover:shadow-[#610094]/50 transition"
                            isLoading={isLoading}
                        >
                            Change Password
                        </Button>
                    </form>
                </div>
            </div>

            {/* Logout Modal */}
            <Modal
                isOpen={showLogoutModal}
                onClose={() => { }}
                isDismissable={false}
                hideCloseButton
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-green-100 rounded-full">
                                <Lock size={20} className="text-green-600" />
                            </div>
                            <span>Password Changed Successfully!</span>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <p className="text-gray-600">
                            Your password has been changed successfully. You need to login again with your new password.
                        </p>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-3">
                            <p className="text-sm text-yellow-800 font-medium">
                                Auto logout in <span className="text-xl font-bold">{countdown}</span> seconds...
                            </p>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            onPress={handleLogout}
                            startContent={<LogOut size={18} />}
                            className="w-full"
                        >
                            Logout Now
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}
