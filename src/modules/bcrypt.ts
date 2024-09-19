import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const salt: number = Number(process.env.BCRYPT_ROUNDS) || 12;

export const Hash = (password: string): string => {
    return bcrypt.hashSync(password, salt);
};

export const Compare = (plainPassword: string, hashedPassword: string): boolean => {
    return bcrypt.compareSync(plainPassword, hashedPassword);
};
