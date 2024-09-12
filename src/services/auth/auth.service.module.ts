import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/infrastructure/db/entities/user.entity";
import { TokenServiceModule } from "../token/token.service.module";
import { CityServiceModule } from "../city/city.service.module";
import { RoleServiceModule } from "../role/role.service.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TokenServiceModule,
    CityServiceModule,
    RoleServiceModule,
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthServiceModule {}
