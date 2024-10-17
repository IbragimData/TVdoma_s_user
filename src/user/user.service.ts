import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createUserDto, updateUserDto } from './dto';
import { hashSync } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        private readonly prismaService:PrismaService
    ){}
    async getUserByIdOrMail(idOrMail:string){
       try{
        const user =  await  this.prismaService.user.findFirst({
            where: {
                OR:[
                    {mail: idOrMail},
                    {id: idOrMail}
                ]
            }
        })
        return user
       }catch(e){
            console.log(e)
            throw new HttpException("server error user", 500)
       }
    }

    async createUser(dto:createUserDto){
        try{
            const user = await this.getUserByIdOrMail(dto.mail)
            if(user){
                throw new BadRequestException()
            }

            const hashPassword = hashSync(dto.password, 5)

            return await this.prismaService.user.create({
                data: {
                    mail: dto.mail,
                    password: hashPassword
                }
            })
        }catch(e){
            console.log(e)
            throw new HttpException("server error user", 500)
        }
    }

    async updateUserName(dto:updateUserDto, userId:string){
        try{
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
        }catch(e){
            console.log(e)
            throw new HttpException("server error user", 500)
        }
    }
}
