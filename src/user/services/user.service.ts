import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JWTPayload } from '../interfaces/jwt-payload.interface';
import { LoginResponse } from '../reponses/login.response';


@Injectable()
export class UserService {
    constructor(
        private jwtService: JwtService,
        private prismaService: PrismaService
    ){

    }
    async login(data: LoginDto): Promise<LoginResponse>{
        
        try{
            const user = await this.prismaService.user.findFirstOrThrow({
                where: {
                    email: data.username
                }
            })
            const isMatch = await bcrypt.compare(data.password, user.password)
            
            if(!isMatch){
                throw new UnauthorizedException()
            }

            const jwtPayload: JWTPayload = {
                userId: user.id,
                email: user.email
            }

            const accessToken = this.jwtService.sign(jwtPayload)

            return {
                statusCode: 200,
                message: "ok",
                payload: {accessToken}
            }

        }catch(err: any){
            console.log(err)
            throw new UnauthorizedException()
        }
    }

    async getDetails(userId: string): Promise<any>{
        try{
            const user = await this.prismaService.user.findFirstOrThrow({
                where: {
                    id: userId
                }
            })
            delete user.password
            return user
        }catch(err: any){
            console.log(err)
            throw new NotFoundException()
        }
    }
}