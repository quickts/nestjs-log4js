import { Module } from "@nestjs/common";
import { Log4jsModule } from "./../src";
import { AppController } from "./app.controller";
import { resolve } from "path";
@Module({
    imports: [
        // Log4jsModule.forRoot({
        //     appenders: {
        //         logToErrorFile: {
        //             type: "dateFile",
        //             filename: resolve(__dirname, "..", "logs", "error"),
        //             alwaysIncludePattern: true,
        //             pattern: "yyyy-MM-dd.log"
        //         },
        //         errorLogger: {
        //             type: "logLevelFilter",
        //             appender: "logToErrorFile",
        //             level: "error"
        //         },
        //         appLogger: {
        //             type: "dateFile",
        //             filename: resolve(__dirname, "..", "logs", "app"),
        //             pattern: "yyyy-MM-dd.log",
        //             alwaysIncludePattern: true
        //         },
        //         consoleLogger: {
        //             type: "console",
        //             layout: {
        //                 type: "colored"
        //             }
        //         }
        //     },
        //     categories: {
        //         default: {
        //             appenders: ["consoleLogger", "appLogger", "errorLogger"],
        //             level: "all"
        //         }
        //     }
        // })
    ],
    controllers: [AppController]
})
export class ApplicationModule {}
