import { inject, injectable } from "tsyringe";
import { UserRepositoryInterface } from "../../repositories/UserRepositoryInterface";
import fs from 'fs';
import path from 'path';

interface DataUser {
    id: number;
    first_name: string;
    last_name: string;
    years: string;
    role_id: number;
    email: string;
    image: string;
} 

@injectable()
class UpdateImageUserService {
    constructor(@inject('UserRepository') private userRepository: UserRepositoryInterface) {}

    async execute(id: number, data: any, userLogged: any): Promise<DataUser> {
        if(userLogged.id !== +id) {
            throw new Error("Usuário não possui acesso a este recurso");
        }

        const existUser = await this.userRepository.findUserById(+id);

        this.deleteOldImage(existUser.image);

        const user = await this.userRepository.update(id, data);

        return {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            years: user.years,
            role_id: user.role_id,
            email: user.email,
            image: user.image
        };
    }

    private deleteOldImage(image: string) {
        if(image) {
            const filePath = path.join(__dirname + '../../../../' + '/uploads/', image);
            fs.stat(filePath, (err) => {
                if (!err) {
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            throw new Error('Erro ao deletar o arquivo');
                        }
                    });
                } 
            });
        }
    }
}

export { UpdateImageUserService };