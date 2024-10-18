import { verify } from "jsonwebtoken";
import { FindUserByIdService } from "../../services/User/FindUserByIdService";
import container from '../../config/container';

interface Payload {
    user_id: number
}

const getUserLogged = async (authorization: string) => {
    const [, token] = authorization.split(' ');
            
    const { user_id } = verify(
                token,
                process.env.JWT_SECRET
            ) as Payload;
    
    const findUserByIdService = container.resolve(FindUserByIdService);

    return await findUserByIdService.execute(user_id);
}

export { getUserLogged };