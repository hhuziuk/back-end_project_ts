import UserDto from "../dtos/user-dto";
import {User} from '../entities/user.entity'
import { PostgresDataSource } from '../utils/connect';
import bcrypt from "bcrypt";
import {v4} from 'uuid'
import mailService from "./mail-service"
import tokenService from "./token-service";
import ApiError from "../exceptions/api-error";
import logger from "../utils/logger";

const userRepository = PostgresDataSource.getRepository(User);

class UserService {
    async registration(email: string, username: string, password: string, role: string) {
        const candidate = await userRepository.findOne({where: {email}})
        if (candidate) {
            throw ApiError.BadRequest(`User with the same ${email} already exists`)
        }
        logger.info(candidate)
        const hashPassword = await bcrypt.hash(password, 8)
        const activationLink = v4()

        const user = await userRepository.create({email, username, password: hashPassword, activationLink, role})
        await userRepository.save(user)
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)

        const userDto = new UserDto(user) // id, email, role, isActivated
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto,
        }
    }

    async activate(activationLink) {
        const user = await userRepository.findOne({where: {activationLink}})
        if (!user) {
            throw ApiError.BadRequest("activation link is not correct")
        }
        user.isActivated = true;
        await userRepository.save(user);
    }

    async login(email: string, password: string) {
        //const user = await userRepository.findOne({where: {email}})
        const user = await userRepository.findOne({
            where: {email}
        })
        if (!user) {
            throw ApiError.BadRequest("User with this email does not exist")
        }
        //logger.info('222: no'+user.password+'@@@@'+password)
        let comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) {
            throw ApiError.BadRequest("Wrong password")
        }
        const userDto = new UserDto(user) // id, email, isActivated
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {
            ...tokens,
            user: userDto,
        }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDatabase = await tokenService.findToken(refreshToken);
        if(!userData || !tokenFromDatabase){
            throw ApiError.UnauthorizedError()
        }
        const user = await userRepository.findOneOrFail({
            where: {id: userData.id},
            select: {
                id: true,
                email: true,
                username: true,
                isActivated: true
            }
        })
        //logger.info(user)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto,
        }
    }

    async getUsers(){
        const users = await userRepository.find();
        return users;
    }
}

export default new UserService();