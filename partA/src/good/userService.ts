// Хэрэглэгчийн мэдээллийн өгөгдлийн загвар
export interface User{
    id: string;
    email: string;
    name: string;
    createdAt: Date;
}

// Хэрэглэгч олдоогүй үед гаргах алдааны 
export class UserNotFoundError extends Error{
    constructor(identifier: string){
        super ('User not found: ${idertifier}');
        this.name = 'UserNotFoundError';
    }
}

// Хэрэглэгч бүртгэлтэй үед дахин үүсгэх гэвэл гарах алдааны
export class UserAlreadyExistsError extends Error{
    constructor(email: string){
        super('User already exists with email: ${email}');
        this.name = 'UserAlreadyExitsError';
    }
}

export interface IUserService{

    // Шинэ хэрэглэгч бүртгэнэ
    createUser(data: Omit<User, 'id' | 'createdAt'>): Promise<User>;

    getUserById(id: string): Promise<User>;


    getUserByEmail(email: string): Promise<User>;

    updateUser(id: string, updates: Partial<Omit<User, 'id' | 'createdAt'>>):Promise<User>;

    deleteUser(id: string): Promise<void>;

    searchUsers(query: string): Promise<User[]>;
}

export class UserService implements IUserService{
        private readonly db: Map<string, User >= new Map();

        async createUser(data: Omit<User, 'id' | 'createdAt'>): Promise<User> {
            const existing = [... this.db.values()].find(u => u.email === data.email);
            if(existing) throw new UserAlreadyExistsError(data.email);

            const user: User ={
                id: crypto.randomUUID(),
                createdAt: new Date(),
                ...data,
            };
            this.db.set(user.id, user);
            return user;
        }

        async getUserById(id: string): Promise<User>{
            const user = this.db.get(id);
            if(!user) throw new UserNotFoundError(id);
            return user;
        }

        async getUserByEmail(email: string): Promise<User>{
            const user = [...this.db.values()].find(u => u.email === email);
            if (!user) throw new UserNotFoundError(email);
            return  user;
        }

        async updateUser(id: string, updates: Partial<Omit<User, 'id' | 'createdAt'>>): Promise<User>{
            const user =  await this.getUserById(id);
            const updated: User = { ...user, ...updates };
            this.db.set(id, updated);
            return updated;
        }
        async deleteUser(id: string): Promise<void> {
            const user = await this.getUserById(id);
            this.db.delete(user.id);
        }


        async searchUsers(query: string): Promise<User[]> {
            const q = query.toLowerCase();
            return [...this.db.values()].filter(
            u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
        );

    }
}
