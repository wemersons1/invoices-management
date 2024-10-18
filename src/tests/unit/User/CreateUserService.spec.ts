import { ADMIN, DEFAULT } from "../../../../constants/roles";
import { UserRepositoryInterface } from "../../../repositories/UserRepositoryInterface";
import { UserRepositoryInMemory } from "../../../repositories/in-memory/User/UserRepositoryInMemory";
import { CreateUserService } from "../../../services/User/CreateUserService";
import { getUserYears } from "../../../utils/date";
interface PayloadUser {
    first_name: string;
    last_name: string;
    birth_day: string;
    role_id: number;
    email: string;
    password: string;
};

describe('Create user', () => {
    let usersRepository: UserRepositoryInterface;
    let createUserService: CreateUserService;

    const dataUser: PayloadUser = {
        first_name: 'usertest',
        last_name: 'lastnametest',
        birth_day: '2000-01-01',
        role_id: DEFAULT,
        email: 'email@test.com',
        password: 'p@ss_123'
    };

    beforeAll(() => {
        usersRepository = new UserRepositoryInMemory();
        createUserService = new CreateUserService(usersRepository);
    });

    it("Should be able to create a new user", async () => {
        const dataUser: PayloadUser = {
            first_name: 'usertest',
            last_name: 'lastnametest',
            birth_day: '2000-01-01',
            role_id: DEFAULT,
            email: 'email@test.com',
            password: 'p@ss_123'
        }

        const user = await createUserService.execute(dataUser);

        expect(user).toHaveProperty('id');
        expect(user.first_name).toBe('usertest');
        expect(user.last_name).toBe('lastnametest');
        expect(user.years).toBe(`${getUserYears('2000-01-01')}`);
        expect(user.role_id).toBe(DEFAULT);
        expect(user.email).toBe('email@test.com');
    });

    it("Should not be able to create an user admin", async () => {
        const dataUserAdmin: PayloadUser = {
            first_name: 'usertest',
            last_name: 'lastnametest',
            birth_day: '2000-01-01',
            role_id: ADMIN,
            email: 'email@test.com',
            password: 'p@ss_123'
        }

        await expect(createUserService.execute(dataUserAdmin)).rejects.toEqual(
            new Error("Usuário não possui acesso a este recurso")
        );
    })

    it("Should not be able to create an existing user", async () => {
        await expect(createUserService.execute(dataUser)).rejects.toEqual(
            new Error("Usuário já cadastrado")
        );
    });
});