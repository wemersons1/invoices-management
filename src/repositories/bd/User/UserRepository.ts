import dbClient from "../../../dbClient";
import { getUserYears } from "../../../utils/date";
import { UserRepositoryInterface } from "../../UserRepositoryInterface";

interface PayloadUser {
    first_name: string;
    last_name: string;
    birth_day: string;
    role_id: number;
    email: string;
    password: string;
} 
interface DataUser {
    first_name: string;
    last_name: string;
    years: string;
    role_id: number;
    email: string;
    password: string;
    image: string;
    id: number;
} 
class UserRepository implements UserRepositoryInterface{
    async create(data: PayloadUser): Promise<DataUser> {
        const user = await dbClient.user.create({
            data
        });

        if(user) {
            return {
                first_name: user.first_name,
                last_name: user.last_name,
                years: getUserYears(user.birth_day),
                role_id: user.role_id,
                email: user.email,
                password: user.password,
                image: user.image,
                id: user.id
            }
        }

        return null;
    }

    async update(id: number, data: PayloadUser): Promise<DataUser> {
        const existUser = await dbClient.user.findFirst({
                where: {
                    id
                }
            });

        if(!existUser) {
            return null;
        }
        
        const user =  await dbClient.user.update({
                                    where: {
                                        id
                                    },
                                    data
                                });
                            

        return {
            first_name: user.first_name,
            last_name: user.last_name,
            years: getUserYears(user.birth_day),
            role_id: user.role_id,
            email: user.email,
            password: user.password,
            image: user.image,
            id: user.id
        }
    }
    
    async findUserById(id: number): Promise<DataUser> {
        const user = await dbClient.user.findFirst({
            where: {
                id
            }
        });

        if(user) {
            return {
                first_name: user.first_name,
                last_name: user.last_name,
                years: getUserYears(user.birth_day),
                role_id: user.role_id,
                email: user.email,
                password: user.password,
                image: user.image,
                id: user.id
            }
        }

        return null;
    }

    async findUserByEmail(email: string): Promise<DataUser> {
        const user = await dbClient.user.findFirst({
                    where: {
                        email
                    }
                });

        if(user) {
            return {
                first_name: user.first_name,
                last_name: user.last_name,
                years: getUserYears(user.birth_day),
                role_id: user.role_id,
                email: user.email,
                password: user.password,
                image: user.image,
                id: user.id
            }
        }

        return null;
    }
    
    async list(): Promise<DataUser[]> {
        const users = await dbClient.user.findMany();

        return users.map(user => {
            return {
                first_name: user.first_name,
                last_name: user.last_name,
                years: getUserYears(user.birth_day),
                role_id: user.role_id,
                email: user.email,
                password: user.password,
                image: user.image,
                id: user.id
            }
        });
    }
    
    async delete(id: number): Promise<void> {

        const user = await dbClient.user.findFirst({
            where: {
                id
            }
        });

        if(user) {
            await dbClient.user.delete({
                where: {
                    id,
                 },
            });
        }
    }
}

export { UserRepository };