import { Controller, Get } from "@nestjs/common";

@Controller("auth")
export class AppController {
    constructor() {}

    @Get("data")
    findAll() {
        return [1, 2, 3];
    }
}
