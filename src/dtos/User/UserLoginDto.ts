import { z } from "zod";

export default class UserLoginDto {
    constructor(
        public readonly email: string,
        public readonly password: string
    ) {}

    public validate() {
        return z.object({
            email: z.string().email().min(5).max(255),
            password: z.string().min(8).max(20),
        })
            .required()
            .parse({
                email: this.email,
                password: this.password,
            });
    }
}
