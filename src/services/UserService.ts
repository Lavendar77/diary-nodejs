import UserRegisterDto from "../dtos/User/UserRegisterDto";
import User from "../models/User";
import { UserRepository } from "../repositories/UserRepository";
import jwt, { Secret } from 'jsonwebtoken';

export default class UserService {
    public async register(userRegisterDto: UserRegisterDto): Promise<{user: User; token: string;}> {
        userRegisterDto.validate();

        const user = new User().new(
            userRegisterDto.name,
            userRegisterDto.email,
            userRegisterDto.password
        );

        const data: any = await new UserRepository().store(user);
        user.setId(data.insertId);

        const token = jwt.sign(user.only(['id', 'name', 'email']), process.env.JWT_KEY as Secret, {
            expiresIn: '1 day',
        });

        return { user, token };
    }
}
