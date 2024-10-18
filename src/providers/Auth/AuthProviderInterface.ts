interface UserPayload {
    email: string;
    name: string;
    user_id: number;
}

interface OptionsPayload {
    expiresIn: string
}

interface AuthProviderInterface {
    comparePassword(password: string, comparePassword: string): Promise<boolean>;
    sign(userData: UserPayload, secret: string, options: OptionsPayload): string;
}

export { AuthProviderInterface }