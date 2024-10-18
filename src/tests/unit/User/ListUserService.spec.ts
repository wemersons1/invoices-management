import { ADMIN, DEFAULT } from "../../../../constants/roles";
import { UserRepositoryInterface } from "../../../repositories/UserRepositoryInterface";
import { UserRepositoryInMemory } from "../../../repositories/in-memory/User/UserRepositoryInMemory";
import { CreateUserService } from "../../../services/User/CreateUserService";
import { ListUserService } from "../../../services/User/ListUserService";

interface PayloadUser {
    first_name: string;
    last_name: string;
    birth_day: string;
    role_id: number;
    email: string;
    password: string;
};

describe('List users', () => {
    let usersRepository: UserRepositoryInterface;
    let listUsersService: ListUserService;
    let createUserService: CreateUserService;
    let userDefault: any;
    let userLoggedAdmin: any;

    const dataUserLoggedAdmin: PayloadUser = {
        first_name: 'adminlogged',
        last_name: 'adminlogged',
        birth_day: '2000-01-01',
        role_id: ADMIN,
        email: 'email@test.com',
        password: 'p@ss_123'
    };

    beforeAll(async () => {
        usersRepository = new UserRepositoryInMemory();
        createUserService = new CreateUserService(usersRepository);
        listUsersService = new ListUserService(usersRepository);

        const dataUser: PayloadUser = {
            first_name: 'usertest',
            last_name: 'lastnametest',
            birth_day: '2000-01-01',
            role_id: DEFAULT,
            email: 'email@test.com',
            password: 'p@ss_123'
        }

        userDefault = await createUserService.execute(dataUser);
        userLoggedAdmin = await usersRepository.create(dataUserLoggedAdmin);
    });

    it("Should return list of items", async () => {
        const users = await listUsersService.execute(userLoggedAdmin);

        expect(users.length).toEqual(2);
    });

    it("Should error if user logged is default", async () => {
        await expect(listUsersService.execute(userDefault)).rejects.toEqual(
            new Error("Usuário não possui acesso a este recurso")
        );
    });
});