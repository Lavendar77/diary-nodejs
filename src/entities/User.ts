import { z } from "zod";

export class User {
    public constructor(public name: string, public email: string) {}

    public validate() {
        let schema = z.object({
            name: z.coerce.string().min(5).max(255),
            email: z.coerce.string().email().min(5).max(255),
        });

        return schema.parse({
            name: this.name,
            email: this.email,
        });
    }
}
