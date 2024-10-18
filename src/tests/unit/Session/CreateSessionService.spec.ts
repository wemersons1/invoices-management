import { verify } from "jsonwebtoken";
import { DEFAULT } from "../../../../constants/roles";
import { AuthProvider } from "../../../providers/Auth/AuthProvider";
import { AuthProviderInterface } from "../../../providers/Auth/AuthProviderInterface";
import { UserRepositoryInterface } from "../../../repositories/UserRepositoryInterface";
import { UserRepositoryInMemory } from "../../../repositories/in-memory/User/UserRepositoryInMemory";
import { CreateSessionService } from "../../../services/Session/CreateSessionService";
import { CreateUserService } from "../../../services/User/CreateUserService";
interface PayloadUser {
    first_name: string;
    last_name: string;
    birth_day: string;
    role_id: number;
    email: string;
    password: string;
};
interface DataLoggedPayload {
    name: string;
    email: string;
}

describe('Create session user', () => {
    let jwtSecret = 'a7656fafe94dae72b1e1487670148412';
    let usersRepository: UserRepositoryInterface;
    let authProvider: AuthProviderInterface;
    let createUserService: CreateUserService;
    let createSessionService: CreateSessionService;
    let userLogged: any;
    let dataUser: PayloadUser = {
        first_name: 'usertest',
        last_name: 'lastnametest',
        birth_day: '2000-01-01',
        role_id: DEFAULT,
        email: 'email@test.com',
        password: 'p@ss_123'
    };
    
    beforeAll(async () => {
        usersRepository = new UserRepositoryInMemory();
        createUserService = new CreateUserService(usersRepository);
        userLogged = await createUserService.execute(dataUser);
        authProvider = new AuthProvider();
        createSessionService = new CreateSessionService(authProvider, usersRepository);
    });

    it("Should be able to receive name and e-mail on login", async () => {
        const token = await createSessionService.execute({email: dataUser.email, password: dataUser.password});
 
        const { name, email } = verify(
            token,
            jwtSecret
        ) as DataLoggedPayload;

        expect(email).toBe(dataUser.email);
        expect(name).toBe(dataUser.first_name);
    });

    it("Should be able to receive error user not searched", async () => {
        await expect(createSessionService.execute({email: 'emailunavailable@test.com', password: dataUser.password})).rejects.toEqual(
            new Error('Usuário não encontrado')
        );
    });

    it("Should be able to receive error wrong password", async () => {
        await expect(createSessionService.execute({email: dataUser.email, password: 'wrongpassword'})).rejects.toEqual(
            new Error('Usuário ou senha inválido(s)')
        );
    });
});