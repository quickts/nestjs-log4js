import { Configuration } from "log4js";
import { resolve, join } from "path";
const basePath = resolve(process.cwd(), "logs");

export function buildDefaultConfig(level: string): Configuration {
    return {
        appenders: {
            logToErrorFile: {
                type: "dateFile",
                filename: join(basePath, "error"),
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
                filename: join(basePath, "all"),
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
                level: level
            }
        }
    };
}
