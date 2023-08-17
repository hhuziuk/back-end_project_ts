
export default class UserDto {
    id: number;
    username: string;
    email: string;
    role: string;
    isActivated: boolean;
    constructor(model: { email: string, username: string, id: number, role: string, isActivated: boolean }){
        this.id = model.id;
        this.username = model.username;
        this.email = model.email;
        this.role = model.role;
        this.isActivated = model.isActivated;
    }
}
