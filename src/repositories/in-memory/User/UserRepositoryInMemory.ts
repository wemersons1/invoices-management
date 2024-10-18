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
class UserRepositoryInMemory implements UserRepositoryInterface{
    private users: DataUser[] = [];

    async create(data: PayloadUser): Promise<DataUser> {
       const user = {
            id: this.users.length + 1,
            first_name: data.first_name,
            last_name: data.last_name,
            years: getUserYears(data.birth_day),
            role_id: data.role_id,
            email: data.email,
            password: data.password,
            image: null
       }

       this.users.push(user);

       return Promise.resolve(user);
    }

    async update(id: number, data: PayloadUser): Promise<DataUser> {
        const user = this.users.find(user => user.id == id);

        if(!user) {
            return null;
        }
        
        user.first_name = data.first_name;
        user.last_name = data.last_name;
        user.years = getUserYears(data.birth_day);
        user.role_id = data.role_id;
        user.email = data.email;
        user.password = data.password;

        return Promise.resolve(user);
    }
    
    async findUserById(id: number): Promise<DataUser> {
        const user = this.users.find(user => user.id == id);

        if(user) {
            return Promise.resolve(user);
        }

        return null;
    }

    async findUserByEmail(email: string): Promise<DataUser> {
        const user = this.users.find(user => user.email == email);

        if(user) {
            return Promise.resolve(user);
        }

        return null;
    }
    
    async list(): Promise<DataUser[]> {
        return Promise.resolve(this.users);
    }
    
    async delete(id: number): Promise<void> {
        const index = this.users.findIndex(user => user.id == id);

        if(index) {
            this.users.splice(index);
        }
    }
}

export { UserRepositoryInMemory };