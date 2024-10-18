import { DEFAULT } from "../../../../constants/roles";
import { UserRepositoryInterface } from "../../../repositories/UserRepositoryInterface";
import { UserRepositoryInMemory } from "../../../repositories/in-memory/User/UserRepositoryInMemory";
import { CreateUserService } from "../../../services/User/CreateUserService";
import { FindUserByIdService } from "../../../services/User/FindUserByIdService";
import { getUserYears } from "../../../utils/date";

interface PayloadUser {
    first_name: string;
    last_name: string;
    birth_day: string;
    role_id: number;
    email: string;
    password: string;
};

describe('Find user by id', () => {
    let usersRepository: UserRepositoryInterface;
    let createUserService: CreateUserService;
    let findUserByIdService: FindUserByIdService;

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
        findUserByIdService = new FindUserByIdService(usersRepository);
    });

    it("Should be able to find a user", async () => {
        const dataUser: PayloadUser = {
            first_name: 'usertest',
            last_name: 'lastnametest',
            birth_day: '2000-01-01',
            role_id: DEFAULT,
            email: 'email@test.com',
            password: 'p@ss_123'
        }

        const user = await createUserService.execute(dataUser);
        const findUser = await findUserByIdService.execute(user.id);

        expect(findUser.id).toBe(user.id);
        expect(findUser.first_name).toBe('usertest');
        expect(findUser.last_name).toBe('lastnametest');
        expect(findUser.role_id).toBe(DEFAULT);
        expect(findUser.email).toBe('email@test.com');
        expect(findUser.years).toBe(getUserYears('2000-01-01'));
    });
});