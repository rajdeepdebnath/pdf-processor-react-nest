import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PdfService } from './pdf.service';
import { PdfEntity } from 'src/entities/pdf.entity';

@Controller()
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Post()
  create(@Body() entity: PdfEntity) {
    return this.pdfService.create(entity);
  }

  @Get()
  async read(@Query('id') id: number) {
    return await this.pdfService.read(id);
  }

  @Get('getall')
  async readAll() {
    return await this.pdfService.readAll();
  }

  @Put()
  update(@Query('id') id: number, @Body() entity: PdfEntity) {
    return this.pdfService.update(id, entity);
  }

  @Delete()
  delete(@Query() id: number) {
    return this.pdfService.delete(id);
  }
}
