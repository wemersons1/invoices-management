import { inject, injectable } from 'tsyringe';
import { UserRepositoryInterface } from '../../repositories/UserRepositoryInterface';
interface DataUser {
    first_name: string;
    last_name: string;
    years: string;
    role_id: number;
    email: string;
    image: string;
    id: number;
} 
@injectable()
class FindUserByIdService {

    constructor(@inject('UserRepository') private userRepository: UserRepositoryInterface) {}

    async execute(id: number): Promise<DataUser> {
        const user = await this.userRepository.findUserById(id);
        if(!user) {
            throw new Error("Usuário não encontrado");
        }

        return {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            years: user.years,
            role_id: user.role_id,
            email: user.email,
            image: user.image,
        };
    }
}

export { FindUserByIdService }