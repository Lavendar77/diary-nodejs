import UserDto from "../dtos/UserDto";
import User from "../models/User";
import { UserRepository } from "../repositories/UserRepository";
import jwt, { Secret } from 'jsonwebtoken';

export default class UserService {
    public async register(userDto: UserDto): Promise<{user: User; token: string;}> {
        userDto.validate();

        const user = new User().new(
            userDto.name,
            userDto.email,
            userDto.password
        );

        const data: any = await new UserRepository().store(user);
        user.setId(data.insertId);

        const token = jwt.sign(user.only(['id', 'name', 'email']), process.env.JWT_KEY as Secret, {
            expiresIn: '1 day',
        });

        return { user, token };
    }
}
