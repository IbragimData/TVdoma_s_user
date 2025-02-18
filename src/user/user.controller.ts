import { Body, Controller, Get, Param, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto, updateUserDto} from './dto';
import { JwtAuthGuard } from 'src/auth/guards';
import { Request } from 'express';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService:UserService
        
    ){}
    @Post("")
    createUser(@Body() dto:createUserDto){
        return this.userService.createUser(dto)
    }

    @Get(":id")
    getUserById(@Param("id") id:string){
        return this.userService.getUserByIdOrMailOrPhone(id)
    }
    
    @Patch("")
    @UseGuards(JwtAuthGuard)
    updateUser(@Req() req:Request, @Body() dto:updateUserDto){
        const user = req.user as {userId:string, phone: string}
        return this.userService.updateUser({id: user.userId, name: dto.name})
    }
    
}
