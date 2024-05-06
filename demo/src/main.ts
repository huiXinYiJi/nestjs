import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import * as session from 'express-session';
import * as cors from 'cors';
import { Request, Response, NextFunction } from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

const whiteList = ['/list'];

function MiddleWareAll(req: Request, res: Response, next: NextFunction) {
  console.log(req.originalUrl);
  // if (whiteList.includes(req.originalUrl)) {
  //   next();
  // } else {
  //   res.send('小黑子露出犄角了吧');
  // }
  next();
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 访问上传的图片
  // http://localhost:3000/xiaoman/1714449690710.jpg
  app.useStaticAssets(join(__dirname, 'images'), {
    prefix: '/xiaoman',
  });
  app.use(cors());
  // 版本控制
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.use(
    session({
      secret: 'my-secret',
      cookie: {
        httpOnly: true,
        maxAge: null,
      },
      name: 'xiaoman.sid', // 生成客户端cookie的名字 默认 connect.sid
      rolling: true, // 每次请求时强行设置cookie， 重置cookie过期时间
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(MiddleWareAll);
  await app.listen(3000);
}
bootstrap();
