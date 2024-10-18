import { inject, injectable } from 'tsyringe';
import { UserRepositoryInterface } from '../../repositories/UserRepositoryInterface';
import { ADMIN } from '../../../constants/roles';

interface DataUser {
    first_name: string;
    last_name: string;
    years: string;
    role_id: number;
    email: string;
} 

@injectable()
class DestroyUserService {

    constructor(@inject('UserRepository') private userRepository: UserRepositoryInterface) {}
   
    async execute(id: number, userLogged: any): Promise<void> {
        if(userLogged.role_id != ADMIN || userLogged.id === +id) {
            throw new Error("Usuário não possui acesso a este recurso");
        }

        try {
            await this.userRepository.delete(id);
        }catch(error) {
            throw new Error(error);
        }
    }
}

export { DestroyUserService};