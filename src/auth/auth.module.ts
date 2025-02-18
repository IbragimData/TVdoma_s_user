import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthGuard } from './guards';
import { JwtStrategy } from './stratages';
@Module({
    imports: [ConfigModule],
    providers: [JwtAuthGuard, JwtStrategy]
})
export class AuthModule {}
