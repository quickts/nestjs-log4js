import { NestFactory } from "@nestjs/core";
import { ApplicationModule } from "./app.module";
import { Log4jsService } from "./../src";
import { resolve } from "path";

async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule, {
        logger: new Log4jsService({
            appenders: {
                logToErrorFile: {
                    type: "dateFile",
                    filename: resolve(__dirname, "..", "logs", "error"),
                    alwaysIncludePattern: true,
                    pattern: "yyyy-MM-dd.log",
                    daysToKeep: 14
                },
                errorLogger: {
                    type: "logLevelFilter",
                    appender: "logToErrorFile",
                    level: "error"
                },
                appLogger: {
                    type: "dateFile",
                    filename: resolve(__dirname, "..", "logs", "app"),
                    alwaysIncludePattern: true,
                    pattern: "yyyy-MM-dd.log",
                    daysToKeep: 14
                },
                consoleLogger: {
                    type: "console",
                    layout: {
                        type: "colored"
                    }
                }
            },
            categories: {
                default: {
                    appenders: ["consoleLogger", "appLogger", "errorLogger"],
                    level: "all"
                }
            }
        })
    });
    // const logger = app.get(Log4jsService);
    // app.useLogger(logger);
    await app.listen(3000);
}
bootstrap();
