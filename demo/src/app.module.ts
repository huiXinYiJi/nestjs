import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DemoController } from './demo/demo.controller';
import { DemoModule } from './demo/demo.module';
import { UserModule } from './user/user.module';
import { ListModule } from './list/list.module';
import { ConfigModule } from './config/config.module';
import { UploadModule } from './upload/upload.module';
import { TestModule } from './test/test.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MangerModule } from './manger/manger.module';

@Module({
  imports: [
    DemoModule,
    UserModule,
    ListModule,
    ConfigModule.forRoot({ path: '/xiaoman' }),
    UploadModule,
    TestModule,
    TypeOrmModule.forRoot({
      type: 'mysql', // 数据库类型
      username: 'root',
      password: '123456',
      host: 'localhost', // host
      port: 3306,
      database: 'db', // 库名
      // entities: [__dirname + '/**/*.entity{.ts,.js}'], // 实体文件
      synchronize: true, // 是否自动将实体类同步到数据库 生产环境建议关闭false
      retryDelay: 500, // 重试连接数据库间隔
      retryAttempts: 10, // 重试连接数据库的次数
      autoLoadEntities: true, // 自动加载实体 forFeature() 方法注册的每个实体都将自动添加到配置对象的实例
    }),
    MangerModule,
  ],
  controllers: [AppController, DemoController],
  providers: [AppService],
})
export class AppModule {}
