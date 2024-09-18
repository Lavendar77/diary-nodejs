import { z } from "zod";
import { Model } from "./_model";

export class User extends Model {
    private id: number|undefined;
    public name: string = '';
    public email: string = '';
    private password: string = '';
    private password_confirmation: string = '';

    protected hidden: string[] = [
        "password",
        "password_confirmation",
        "hidden",
    ];

    public new(name: string, email: string, password: string, password_confirmation: string): this {
        this.name = name;
        this.email = email;
        this.password = password;
        this.password_confirmation = password_confirmation;

        return this;
    }

    public setId(id: number): this {
        this.id = id;

        return this;
    }

    public getId(): number|undefined {
        return this.id;
    }

    public getPassword(): string {
        return this.password;
    }

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
