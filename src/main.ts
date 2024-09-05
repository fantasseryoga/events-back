import { NestFactory } from "@nestjs/core";
import { appConfigInstance } from "./infrastructure/app-config/app-config";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(appConfigInstance.API_BASE_URI_PATH);
  app.enableCors({
    origin: appConfigInstance.API_CORS_ORIGINS,
    credentials: true,
    allowedHeaders: "*",
  });
  await app.listen(appConfigInstance.API_PORT);
  console.log(`Events app started on port ${appConfigInstance.API_PORT}`);
}
bootstrap();
