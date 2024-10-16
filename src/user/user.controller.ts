import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto, updateUserDto } from './dto';

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
        return this.userService.getUserByIdOrMail(id)
    }

    @Put(":id")
    updateUserName(@Param("id") id:string, @Body() dto:updateUserDto){
        return this.userService.updateUserName(dto, id)
    }
    
}
