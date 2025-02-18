import { BadRequestException, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createUserDto, updateUserDto } from './dto';

@Injectable()
export class UserService {
    constructor(
        private readonly prismaService: PrismaService
    ) { }
    async getUserByIdOrMailOrPhone(idOrMailOrPhone: string) {
        try {
            const user = await this.prismaService.user.findFirst({
                where: {
                    OR: [
                        { email: idOrMailOrPhone },
                        { id: idOrMailOrPhone },
                        { phone: idOrMailOrPhone }
                    ]
                }
            })
            return user
        } catch (e) {
            console.log(e)
            throw new HttpException("server error user", 500)
        }
    }

    async createUser(dto: createUserDto) {
        try {
            const user = await this.getUserByIdOrMailOrPhone(dto.email)
            if (user) {
                throw new BadRequestException()
            }

            return await this.prismaService.user.create({
                data: {
                    ...dto
                }
            })
        } catch (e) {
            console.log(e)
            throw new HttpException("server error user", 500)
        }
    }

    async updateUser(dto: updateUserDto) {
        const user = await this.prismaService.user.findFirst({
            where: {
                id: dto.id
            }
        })

        if (!user) {
            throw new UnauthorizedException()
        }

        return await this.prismaService.user.update({
            where: {
                id: user.id
            },
            data: {
                name: dto.name
            }
        })
    }
}
