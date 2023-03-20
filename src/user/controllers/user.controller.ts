import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { LoginDto } from '../dto/login.dto';
import { LoginResponse } from '../reponses/login.response';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller("user")
@ApiTags("user")
export class UserController{
    constructor(
        private readonly userService: UserService
    ){}

    @Post("login")
    @ApiOkResponse({type: LoginResponse})
    login(@Body() data: LoginDto){
        return this.userService.login(data)
    }

    @Get(":id/details")
    @ApiOkResponse()
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    getDetails(
        @Param("id") userId: string
    ){
        return this.userService.getDetails(userId)
    }
}
