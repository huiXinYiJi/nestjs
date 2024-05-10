import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppJapanService } from './app.japan.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestModule } from './test/test.module';
import { Event } from './events/event.entity';
import { EventsModule } from './events/events.module';
import { AppDummy } from './app.dummy';
import { ConfigModule } from '@nestjs/config';
import ormConfig from './config/orm.config';
import ormConfigProd from './config/orm.config.prod';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig],
      // ignoreEnvFile: true
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory:
        process.env.NODE_ENV !== 'production' ? ormConfig : ormConfigProd,
    }),
    // TypeOrmModule.forRoot({
    // type: 'mysql', // 数据库类型
    // username: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    // host: process.env.DB_HOST, // host
    // port: Number(process.env.DB_PORT),
    // database: process.env.DB_NAME, // 库名
    // entities: [Event],
    // // entities: [__dirname + '/**/*.entity{.ts,.js}'], // 实体文件
    // synchronize: true, // 是否自动将实体类同步到数据库 生产环境建议关闭false
    // retryDelay: 500, // 重试连接数据库间隔
    // retryAttempts: 10, // 重试连接数据库的次数
    // autoLoadEntities: true, // 自动加载实体 forFeature() 方法注册的每个实体都将自动添加到配置对象的实例
    // }),
    TestModule,
    EventsModule,
  ],
  controllers: [AppController],
  // providers: [AppService],
  providers: [
    {
      provide: AppService,
      // useClass: AppService
      useClass: AppJapanService,
    },
    {
      provide: 'APP_NAME',
      useValue: 'Nest Events Backend!',
    },
    {
      provide: 'MESSAGE',
      inject: [AppDummy],
      useFactory: (app) => `${app.dummy()} Factory!`,
    },
    AppDummy,
  ],
})
export class AppModule {}
