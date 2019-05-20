import { Provider } from "@nestjs/common";
import { Configuration } from "log4js";
import { LOG4JS_OPTION } from "./log4js.constants";

export function createOptionProvider(options: Configuration): Provider {
    return {
        provide: LOG4JS_OPTION,
        useValue: options
    };
}
