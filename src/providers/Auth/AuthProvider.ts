import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AuthProviderInterface } from "./AuthProviderInterface";

interface UserPayload {
    email: string;
    name: string;
    user_id: number;
}

interface OptionsPayload {
    expiresIn: string
}

class AuthProvider implements AuthProviderInterface{
    async comparePassword(password: string, userPassword: string): Promise<boolean>{
        return await compare(password, userPassword);
    }

    sign(userData: UserPayload, secret: string, options: OptionsPayload): string {
        return sign(userData, secret, options);
    }
}

export { AuthProvider };