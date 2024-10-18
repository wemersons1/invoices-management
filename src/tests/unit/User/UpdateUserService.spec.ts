import { ADMIN, DEFAULT } from "../../../../constants/roles";
import { UserRepositoryInterface } from "../../../repositories/UserRepositoryInterface";
import { UserRepositoryInMemory } from "../../../repositories/in-memory/User/UserRepositoryInMemory";
import { CreateUserService } from "../../../services/User/CreateUserService";
import { UpdateUserService } from "../../../services/User/UpdateUserService";
import { getUserYears } from "../../../utils/date";

interface PayloadUser {
    first_name: string;
    last_name: string;
    birth_day: string;
    role_id: number;
    email: string;
    password: string;
};

describe('Update user', () => {
    let usersRepository: UserRepositoryInterface;
    let createUserService: CreateUserService;
    let updateUserService: UpdateUserService;
    let userLogged: any;

    const dataUserLogged: PayloadUser = {
        first_name: 'userlogged',
        last_name: 'lastnameuserlogged',
        birth_day: '2000-01-01',
        role_id: DEFAULT,
        email: 'email@test.com',
        password: 'p@ss_123'
    };

    const dataUser: PayloadUser = {
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
        updateUserService = new UpdateUserService(usersRepository);

        userLogged = await createUserService.execute(dataUserLogged);
    });

    it("Should be able to update a user", async () => {     
        const dataUserUpdated: PayloadUser = {
            first_name: 'usertestupdated',
            last_name: 'lastnametestupdated',
            birth_day: '2000-01-02',
            role_id: ADMIN,
            email: 'emailupdated@test.com',
            password: 'p@ss_123updated'
        }

        const userUpdated = await updateUserService.execute(userLogged.id, dataUserUpdated, userLogged);
        expect(userUpdated).toHaveProperty('id');
        expect(userUpdated.first_name).toBe('usertestupdated');
        expect(userUpdated.last_name).toBe('lastnametestupdated');
        expect(userUpdated.years).toBe(`${getUserYears('2000-01-02')}`);
        expect(userUpdated.role_id).toBe(ADMIN);
        expect(userUpdated.email).toBe('emailupdated@test.com');
    });

    it("Should not be able to update a user other than your own", async () => {
        const user = await createUserService.execute(dataUser);

        const dataUserUpdated: PayloadUser = {
            first_name: 'usertestupdated',
            last_name: 'lastnametestupdated',
            birth_day: '2000-01-02',
            role_id: ADMIN,
            email: 'emailupdated@test.com',
            password: 'p@ss_123updated'
        }

        await expect(createUserService.execute(dataUser)).rejects.toEqual(
            new Error("Usuário já cadastrado")
        );

        await expect(updateUserService.execute(user.id, dataUserUpdated, userLogged)).rejects.toEqual(
            new Error('Usuário não possui acesso a este recurso')
        );
    })
});