import { ADMIN, DEFAULT } from "../../../../constants/roles";
import { UserRepositoryInterface } from "../../../repositories/UserRepositoryInterface";
import { UserRepositoryInMemory } from "../../../repositories/in-memory/User/UserRepositoryInMemory";
import { CreateUserService } from "../../../services/User/CreateUserService";
import { DestroyUserService } from "../../../services/User/DestroyUserService";
import { getUserYears } from "../../../utils/date";

interface PayloadUser {
    first_name: string;
    last_name: string;
    birth_day: string;
    role_id: number;
    email: string;
    password: string;
};

const dataUserLoggedAdmin: PayloadUser = {
    first_name: 'admin',
    last_name: 'last_name_admin',
    birth_day: '2000-01-01',
    role_id: ADMIN,
    email: 'admin@test.com',
    password: 'p@ss_123'
};

const dataUserLoggedDefault: PayloadUser = {
    first_name: 'userdefaullogged',
    last_name: 'userdefaullogged',
    birth_day: '2000-01-01',
    role_id: DEFAULT,
    email: 'userdefaullogged@test.com',
    password: 'p@ss_123'
};

describe('Destroy user', () => {
    let userLoggedAdmin: any;
    let userLoggedDefault: any;
    let usersRepository: UserRepositoryInterface;
    let createUserService: CreateUserService;
    let destroyUserService: DestroyUserService;
    let user: any;

    beforeAll(async () => {
        usersRepository = new UserRepositoryInMemory();
        createUserService = new CreateUserService(usersRepository);
        destroyUserService = new DestroyUserService(usersRepository);
        userLoggedAdmin = await usersRepository.create(dataUserLoggedAdmin);
        userLoggedDefault = await createUserService.execute(dataUserLoggedDefault);

        const dataUser: PayloadUser = {
            first_name: 'usertest',
            last_name: 'lastnametest',
            birth_day: '2000-01-01',
            role_id: DEFAULT,
            email: 'email@test.com',
            password: 'p@ss_123'
        }

        user = await createUserService.execute(dataUser);
    });

    it("Should be able to destroy an existing user", async () => {
        expect(user).toHaveProperty('id');
        expect(user.first_name).toBe('usertest');
        expect(user.last_name).toBe('lastnametest');
        expect(user.years).toBe(`${getUserYears('2000-01-01')}`);
        expect(user.role_id).toBe(DEFAULT);
        expect(user.email).toBe('email@test.com');

        const destroyedUser = await destroyUserService.execute(user.id, userLoggedAdmin);

        expect(destroyedUser).toBe(undefined);
    });

    it("Should be able to destroy if user logged is admin", async () => {
        await expect(destroyUserService.execute(user.id, userLoggedDefault)).rejects.toEqual(
            new Error("Usuário não possui acesso a este recurso")
        );
    });
});