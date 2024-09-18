import { z } from "zod";

export default class UserDto {
    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
        public readonly password_confirmation: string
    ) {}

    public validate() {
        return z.object({
            name: z.string().min(5).max(255),
            email: z.string().email().min(5).max(255),
            password: z.string().min(8).max(20)
                .refine((password) => /[A-Z]/.test(password), {
                    message: "Password must contain an uppercase letter",
                })
                .refine((password) => /[a-z]/.test(password), {
                    message: "Password must contact a lowercase letter",
                })
                .refine((password) => /[0-9]/.test(password), {
                    message: "Password must contain a digit",
                })
                .refine((password) => /[!@#$%^&*]/.test(password), {
                    message: "Password must contain a special character",
                }),
            password_confirmation: z.string().min(8).max(20),
        })
            .required()
            .refine((data) => data.password === data.password_confirmation, {
                message: "Passwords don't match",
                path: ["password_confirmation"],
            })
            .parse({
                name: this.name,
                email: this.email,
                password: this.password,
                password_confirmation: this.password_confirmation,
            });
    }
}
