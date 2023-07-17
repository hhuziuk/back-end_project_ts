import {UserDto} from "../dtos/user-dto";
import {User} from '../entities/user.entity'
import { PostgresDataSource } from '../utils/connect';
import bcrypt from "bcrypt";
import logger from "../utils/logger";
import {v4} from 'uuid'
import mailService from "./mail-service"
import tokenService from "./token-service";


const userRepository = PostgresDataSource.getRepository(User);
const user = new User()
class UserService{

    async registration(email: string, username: string, password: string){
        const candidate = await userRepository.findOneBy({email, username})
        if(candidate){
            throw new Error(`User with the same ${email} already exists`)
        }

        const hashPassword = await bcrypt.hash(password, 8)
        const activationLink = v4()

        const user = await userRepository.create({email, username, password: hashPassword, activationLink})
        await mailService.sendActivationMail(email, activationLink)

        const userDto = new UserDto(user) // id, email, isActivated
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto,
        }
    }
}

export default new UserService();
