import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";

@Injectable()
export class AppConfig {
  constructor(private readonly configService: ConfigService) {}

  get API_PORTAL_NAME(): string {
    return this.configService.get<string>("API_PORTAL_NAME") || "";
  }

  get API_ENVIRONMENT(): string {
    return this.configService.get<string>("API_ENVIRONMENT");
  }

  get API_PORT(): number {
    return this.configService.get<number>("API_PORT");
  }

  get API_CORS_ORIGINS(): string {
    return this.configService.get<string>("API_CORS_ORIGINS");
  }

  get API_BASE_URI_PATH(): string {
    return this.configService.get<string>("API_BASE_URI_PATH");
  }

  get DB_NAME(): string {
    return this.configService.get<string>("DB_NAME");
  }

  get DB_USER_NAME(): string {
    return this.configService.get<string>("DB_USER_NAME");
  }

  get DB_USER_PASSWORD(): string {
    return this.configService.get<string>("DB_USER_PASSWORD");
  }

  get API_JWT_ACCESS_TOKEN_SECRET(): string {
    return this.configService.get<string>("API_JWT_ACCESS_TOKEN_SECRET");
  }

  get API_JWT_ACCESS_TOKEN_EXPIRATION(): string {
    return this.configService.get<string>("API_JWT_ACCESS_TOKEN_EXPIRATION");
  }

  get API_JWT_REFRESH_TOKEN_SECRET(): string {
    return this.configService.get<string>("API_JWT_REFRESH_TOKEN_SECRET");
  }

  get API_JWT_REFRESH_TOKEN_EXPIRATION(): string {
    return this.configService.get<string>("API_JWT_REFRESH_TOKEN_EXPIRATION");
  }
}

config();
const configService = new ConfigService();
export const appConfigInstance = new AppConfig(configService);
