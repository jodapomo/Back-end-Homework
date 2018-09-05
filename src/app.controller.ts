import { Get, Controller, Response } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(@Response() res): string {
    return res.redirect('/api/v1/docs');;
  }
}
