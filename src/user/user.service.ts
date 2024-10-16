import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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
}
