import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { JwtAuthGuard } from "./guards/jwt.guard";
import { JwtStrategy } from "./strategy/jwt.strategy";

@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
                secret: configService.getOrThrow<string>("JWT_SECRET"),
                signOptions: {
                    expiresIn: '1h',
                    subject: configService.getOrThrow<string>("SUPER_ADMIN_EMAIL"),
                }
            }),
            inject: [ConfigService]
        })
    ],
    providers: [JwtAuthGuard, JwtStrategy],
    exports: [JwtModule]
})
export class AuthModule {}