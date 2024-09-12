import { Module } from "@nestjs/common";
import { DbSourceModule } from "./infrastructure/db/db.data-source.module";
import { CategoryControllerModule } from "./controllers/category/category.controller.module";
import { CityControllerModule } from "./controllers/city/city.controller.module";
import { EventControllerModule } from "./controllers/event/event.controller.module";
import { AuthConrollerModule } from "./controllers/auth/auth.controller.module";
import { UserControllerModule } from "./controllers/user/user.controller.module";

@Module({
  imports: [
    DbSourceModule,
    CategoryControllerModule,
    CityControllerModule,
    EventControllerModule,
    AuthConrollerModule,
    UserControllerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
