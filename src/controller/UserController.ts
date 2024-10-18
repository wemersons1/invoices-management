import { Request, Response } from "express";
import container from '../config/container';
import { CreateUserService } from "../services/User/CreateUserService";
import { UpdateUserService } from "../services/User/UpdateUserService";
import { FindUserByIdService } from "../services/User/FindUserByIdService";
import { DestroyUserService } from "../services/User/DestroyUserService";
import { ListUserService } from "../services/User/ListUserService";
import { UpdateImageUserService } from "../services/User/UpdateImageUserService";
import { ADMIN } from "../../constants/roles";
import { getUserLogged } from "../providers/User/GetUserLogged";

class UserController {
    async store(req: Request, res: Response) {
        const {   
            first_name,
            last_name,
            birth_day,
            role_id,
            email,
            password 
        } = req.body;

        const createUserService = container.resolve(CreateUserService);

        const userCreated = await createUserService.execute({
            first_name,
            last_name,
            birth_day,
            role_id,
            email,
            password 
        });

        res.status(201).json(userCreated);
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { authorization } = req.headers;

        const userLogged = await getUserLogged(authorization);
        
        const {   
            first_name,
            last_name,
            birth_day,
            role_id,
            email,
            password 
        } = req.body;

        const updateUserService = container.resolve(UpdateUserService);

        const userUpdated = await updateUserService.execute(+id, {
            first_name,
            last_name,
            birth_day,
            role_id,
            email,
            password 
        }, userLogged);

        res.json(userUpdated);
    }

    async show(req: Request, res: Response) {
        const { id } = req.params;

        const findUserByIdService = container.resolve(FindUserByIdService);
   
        const user = await findUserByIdService.execute(+id);

        res.json(user);
    }

    async destroy(req: Request, res: Response) {
        const { id } = req.params;
        const { authorization } = req.headers;

        const userLogged = await getUserLogged(authorization);

        const destroyUserService = container.resolve(DestroyUserService);
        
        await destroyUserService.execute(+id, userLogged);

        res.status(204).json();
    }

    async index(req: Request, res: Response) {
        const { authorization } = req.headers;
        const userLogged = await getUserLogged(authorization);

        const listUserService = container.resolve(ListUserService);

        const users = await listUserService.execute(userLogged);

        res.json(users);
    }

    async updateImage(req: Request, res: Response) {    
        const updateImageUserService = container.resolve(UpdateImageUserService);
    
        const { id } = req.params;
        const data = {
            image: req.file.filename
        };
        const { authorization } = req.headers;
    
        const userLogged = await getUserLogged(authorization);

        const userImage = await updateImageUserService.execute(+id, data, userLogged);
      
        return res.send(userImage);
    }
}

export { UserController }