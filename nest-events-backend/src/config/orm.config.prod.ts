import { Event } from '../events/event.entity';
import { Attendee } from '../events/attendee.entity';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { registerAs } from '@nestjs/config';

export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    type: 'mysql', // 数据库类型
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST, // host
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME, // 库名
    entities: [Event, Attendee],
    // entities: [__dirname + '/**/*.entity{.ts,.js}'], // 实体文件
    synchronize: false, // 是否自动将实体类同步到数据库 生产环境建议关闭false
    retryDelay: 500, // 重试连接数据库间隔
    retryAttempts: 10, // 重试连接数据库的次数
    autoLoadEntities: true, // 自动加载实体 forFeature() 方法注册的每个实体都将自动添加到配置对象的实例
  }),
);
