import { Global, Module, DynamicModule } from "@nestjs/common";
import { Configuration } from "log4js";
import { Log4jsService } from "./log4js.service";
import { createOptionProvider } from "./log4js.provider";

@Global()
@Module({})
export class Log4jsModule {
    static forRoot(options?: Configuration | string): DynamicModule {
        const optionProvider = createOptionProvider(options);
        return {
            module: Log4jsModule,
            providers: [Log4jsService, optionProvider],
            exports: [Log4jsService]
        };
    }
}

@Module({})
export class Log4jsGlobalModule {
    static forRoot(options?: Configuration | string): DynamicModule {
        const optionProvider = createOptionProvider(options);
        return {
            module: Log4jsGlobalModule,
            providers: [Log4jsService, optionProvider],
            exports: [Log4jsService]
        };
    }
}
