import { Inject, LoggerService, Injectable } from "@nestjs/common";
import { getLogger, Logger, shutdown, configure, Configuration } from "log4js";
import { LOG4JS_OPTION } from "./log4js.constants";
import { buildDefaultConfig } from "./log4js.default.config";

@Injectable()
export class Log4jsService implements LoggerService {
    private loggers: Map<string, Logger>;
    constructor(@Inject(LOG4JS_OPTION) options?: Configuration | string) {
        this.loggers = new Map();
        if (typeof options == "string") {
            options = buildDefaultConfig(options);
        } else if (typeof options == "undefined") {
            options = buildDefaultConfig("all");
        }
        configure(options);
    }

    getLogger(loggerName = "APP") {
        let logger = this.loggers.get(loggerName);
        if (!logger) {
            logger = getLogger(loggerName);
            this.loggers.set(loggerName, logger);
        }
        return logger;
    }

    log(message: any, context?: string) {
        this.getLogger(context).info(message);
    }

    error(message: any, trace?: string, context?: string) {
        this.getLogger(context).error(message, trace);
    }

    warn(message: any, context?: string) {
        this.getLogger(context).warn(message);
    }

    debug(message: any, context?: string) {
        this.getLogger(context).debug(message);
    }

    flushall(cb?: () => void) {
        shutdown(() => {
            cb && cb();
        });
    }
}
