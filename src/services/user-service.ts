import {UserDto} from "../dtos/user-dto";
import {User} from '../entities/user.entity'
import { PostgresDataSource } from '../utils/connect';
import bcrypt from "bcrypt";
import {v4} from 'uuid'
import mailService from "./mail-service"
import tokenService from "./token-service";
import ApiError from "../exceptions/api-error";
import logger from "../utils/logger";

const userRepository = PostgresDataSource.getRepository(User);
const user = new User()
class UserService{
    async registration(email: string, username: string, password: string){
        const candidate = await userRepository.findBy({email})
        if(candidate){
            throw ApiError.BadRequest(`User with the same ${email} already exists`)
        }
        const hashPassword = await bcrypt.hash(password, 8)
        const activationLink = v4()

        const user = await userRepository.create({email, username, password: hashPassword, activationLink})
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)

        const userDto = new UserDto(user) // id, email, isActivated
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto,
        }
    }

    async activate(activationLink){
        const user = await userRepository.findOneBy({activationLink})
        if(!user){
            throw ApiError.BadRequest("activation link is not correct")
        }
        user.isActivated = true;
        await userRepository.save(user);
    }

    // async login(email: string, username: string, password: string){
    //     const user = await userRepository.findOneBy({email, username})
    //     if(!user){
    //         throw new Error("User does not exist")
    //     }
    //     let comparePassword : boolean = await bcrypt.compare(password, user.password)
    //     if(!comparePassword){
    //         throw new Error("Wrong password")
    //     }
    //     const userDto = new UserDto(user) // id, email, isActivated
    //     const tokens = tokenService.generateTokens({...userDto})
    //     await tokenService.saveToken(userDto.id, tokens.refreshToken)
    //     return {
    //         ...tokens,
    //         user: userDto,
    //     }
    // }
}

export default new UserService();
