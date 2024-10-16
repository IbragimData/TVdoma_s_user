import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createUserDto, updateUserDto } from './dto';
import { userInfo } from 'os';

@Injectable()
export class UserService {
    constructor(
        private readonly prismaService:PrismaService
    ){}
    async getUserByIdOrMail(idOrMail:string){
        return await  this.prismaService.user.findFirst({
            where: {
                OR:[
                    {mail: idOrMail},
                    {id: idOrMail}
                ]
            }
        })
    }

    async createUser(dto:createUserDto){
        const user = await this.getUserByIdOrMail(dto.mail)
        if(user){
            throw new BadRequestException()
        }
        return await this.prismaService.user.create({
            data: {
                ...dto
            }
        })
    }

    async updateUserName(dto:updateUserDto, userId:string){
        const user = await this.getUserByIdOrMail(userId)
        if(!user){
            throw new BadRequestException()
        }
        return await this.prismaService.user.update({
            where: {
                id: user.id
            },
            data: {
                ...dto
            }
        })
    }
}
