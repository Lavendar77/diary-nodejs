import UserLoginDto from "../dtos/User/UserLoginDto";
import UserRegisterDto from "../dtos/User/UserRegisterDto";
import User from "../models/User";
import { Compare } from "../modules/bcrypt";
import UserRepository from "../repositories/UserRepository";
import jwt, { Secret } from 'jsonwebtoken';

export default class UserService {
    public async find(userId: number, email?: string): Promise<object> {
        if (email) {
            const data: any = await new UserRepository().where('id', userId).where('email', email).get();

            if (!data && !data.length) {
                throw new Error('User not found');
            }

            return User.fromObject(data[0]).toJSON();
        }

        return (await new UserRepository().findById(userId)).toJSON();
    }

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

    public async login(userLoginDto: UserLoginDto): Promise<{user: User; token: string;}> {
        userLoginDto.validate();

        const data = await new UserRepository().query().where('email', userLoginDto.email).get();

        if (!Compare(userLoginDto.password, data[0].password)) {
            throw new Error('Invalid credentials');
        }

        const user = User.fromObject(data[0]);

        const token = jwt.sign(user.only(['id', 'name', 'email']), process.env.JWT_KEY as Secret, {
            expiresIn: '1 day',
        });

        return { user, token };
    }
}
