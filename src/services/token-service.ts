import jwt from 'jsonwebtoken'
import { PostgresDataSource } from '../utils/connect';
import {Token} from "../entities/token.entity";
import {User} from "../entities/user.entity";

const tokenRepository = PostgresDataSource.getRepository(Token);

class TokenService{
    generateTokens(payload){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '1h'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    // mystery??
    async saveToken(userId, refreshToken){
        const tokenData = await tokenRepository.findOneBy({user: userId})
        if(tokenData){
            tokenData.refreshToken = refreshToken;
            return tokenRepository.save(tokenData);
        }
        const token = await tokenRepository.create({user: userId, refreshToken})
        return token;
    }
}

export default new TokenService()