import { inject } from 'tsyringe';
import { UserRepositoryInterface } from '../../repositories/UserRepositoryInterface';
interface DataUser {
    first_name: string;
    last_name: string;
    years: string;
    role_id: number;
    email: string;
    id: number;
} 
class FindUserByEmailService {
    constructor(@inject('UserRepository') private userRepository: UserRepositoryInterface) {}

    async execute(email: string): Promise<DataUser> {

        return await this.userRepository.findUserByEmail(email);
    }
}

export { FindUserByEmailService }