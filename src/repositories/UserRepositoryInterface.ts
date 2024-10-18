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

interface UserRepositoryInterface {
    create(data: PayloadUser): Promise<DataUser>
    update(id: number, data: PayloadUser): Promise<DataUser>
    findUserById(id: number): Promise<DataUser>
    findUserByEmail(email: string): Promise<DataUser>
    list(): Promise<DataUser[]>
    delete(id: number): void
}

export { UserRepositoryInterface }