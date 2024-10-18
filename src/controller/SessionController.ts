import { Request, Response } from "express";
import container from '../config/container';
import { CreateSessionService } from "../services/Session/CreateSessionService";

class SessionController {
    async store(req: Request, res: Response) {
        const { email, password } = req.body;

        const createSessionService = await container.resolve(CreateSessionService);
        const token = await createSessionService.execute({email, password});

        if(token) {
            res.json(token);
        }

        res.status(401)
            .json({
                message: "Usuário ou senha inválidos"
            });
    }
}

export { SessionController }