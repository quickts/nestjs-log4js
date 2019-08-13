# nestjs-log4js

## Installation

    $ npm install @quickts/nestjs-log4js log4js

## Usage

1.能捕获所有的日志, 推荐使用此方式

```ts
// file: index.ts
import { Log4jsService } from "@quickts/nestjs-log4js";
import { NestFactory } from "@nestjs/core";
import { ApplicationModule } from "./app.module";

async function bootstrap() {
    // 使用默认的打印方式, 将会在工作目录下生成logs文件夹
    // 使用dateFile的方式存储文件, 日志文件保留14天
    // 日志打印等级为ALL
    const logger = new Log4jsService();

    // 与上面相同, 但是可以自定义日志等级
    const logger = new Log4jsService("INFO");

    // 自定义日志打印方式
    const logger = new Log4jsService({...});

    // 创建时就指定logger, 所有框架消息都能打印
    const app = await NestFactory.create(ApplicationModule, {logger});

    await app.listen(3000);
}

// file: other.ts
import { Logger } from "@nestjs/common";

class OtherService {
    // 创建loger对象
    private readonly logger = new Logger("OtherService");

    constructor() {
        this.logger.log("HAHA!"); // print:[2019-08-10T15:45:48.875] [INFO] OtherService - HAHA!
    }
}
```

2.使用模块

```ts
// file: index.ts
import { Log4jsService } from "@quickts/nestjs-log4js";
import { NestFactory } from "@nestjs/core";
import { ApplicationModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule);
    // 获得logger对象
    const logger = app.get(Log4jsService);
    app.useLogger(logger);

    await app.listen(3000);
}

// file: app.module.ts
import { Module } from "@nestjs/common";
import { Log4jsModule } from "@quickts/nestjs-log4js";

@Module({
    imports: [Log4jsModule.forRoot()], // 注册模块
    controllers: []
})
export class ApplicationModule {}

// file: other.ts
import { Logger } from "@nestjs/common";
import { Log4jsService } from "@quickts/nestjs-log4js";

class OtherService {
    private readonly logger = new Logger("OtherService");

    constructor(private readonly log4jService: Log4jsService) {
        this.logger.log("HAHA!"); // print:[2019-08-10T15:45:48.875] [INFO] OtherService - HAHA!

        this.log4jService.log("HAHA!", "OtherService"); // print:[2019-08-10T15:45:48.875] [INFO] OtherService - HAHA!
    }
}
```
