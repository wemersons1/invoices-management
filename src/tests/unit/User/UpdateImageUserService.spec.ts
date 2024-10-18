import { ADMIN, DEFAULT } from "../../../../constants/roles";
import { UserRepositoryInterface } from "../../../repositories/UserRepositoryInterface";
import { UserRepositoryInMemory } from "../../../repositories/in-memory/User/UserRepositoryInMemory";
import { CreateUserService } from "../../../services/User/CreateUserService";
import { UpdateImageUserService } from "../../../services/User/UpdateImageUserService";
interface PayloadUser {
    first_name: string;
    last_name: string;
    birth_day: string;
    role_id: number;
    email: string;
    password: string;
};

describe('Update image user', () => {
    let usersRepository: UserRepositoryInterface;
    let createUserService: CreateUserService;
    let updateImageUserService: UpdateImageUserService;
    let userLogged: any;
    let userImageUpdated: any;

    const dataUserLogged: PayloadUser = {
        first_name: 'userlogged',
        last_name: 'lastnameuserlogged',
        birth_day: '2000-01-01',
        role_id: DEFAULT,
        email: 'email@test.com',
        password: 'p@ss_123'
    };

    const dataUserImageUpdated: PayloadUser = {
        first_name: 'usertestupdated',
        last_name: 'lastnametestupdated',
        birth_day: '2000-01-02',
        role_id: DEFAULT,
        email: 'emailupdated@test.com',
        password: 'p@ss_123updated'
    }

    beforeAll(async () => {
        usersRepository = new UserRepositoryInMemory();
        createUserService = new CreateUserService(usersRepository);
        updateImageUserService = new UpdateImageUserService(usersRepository);

        userLogged = await createUserService.execute(dataUserLogged);
        userImageUpdated = await createUserService.execute(dataUserImageUpdated);
    });

    it("Should not be able to update a user image", async () => {  
        const dataImage = {
            image: 'name-image.jpg'
        };
        
        await expect(updateImageUserService.execute(userImageUpdated.id, dataImage, userLogged)).rejects.toEqual(
            new Error("Usuário não possui acesso a este recurso")
        );
    });

    it("Should not be able to update a user image", async () => {  
        const dataImage = {
            image: 'name-image.jpg'
        };
        const userUpdatedImage = await updateImageUserService.execute(userLogged.id, dataImage, userLogged)
        
        expect(userUpdatedImage).toHaveProperty('id');
        expect(userUpdatedImage).toHaveProperty('image');
    });
});