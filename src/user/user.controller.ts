import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from './dto';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService:UserService
    ){}
    @Post("")
    createUser(@Body() dto:createUserDto){
        return this.userService.createUser(dto)
    }
}
