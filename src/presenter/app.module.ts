import { CourseModule } from '@/presenter/modules/course.module';
import { UserCourseModule } from '@/presenter/modules/user-course.module';
import { Module } from '@nestjs/common';
import { UserModule } from '@/presenter/modules/user.module';
import { ConfigModule } from '@nestjs/config';
import authConfiguration from '@/infra/configurations/authentication.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [authConfiguration],
    }),
    UserModule,
    CourseModule,
    UserCourseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
