import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PdfEntity } from 'src/entities/pdf.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PdfService {
  constructor(
    @InjectRepository(PdfEntity)
    private pdfRepository: Repository<PdfEntity>,
  ) {}

  create(entity: PdfEntity) {
    console.log(entity);

    return this.pdfRepository.insert(entity);
  }

  async read(id: number) {
    return await this.pdfRepository.findOneBy({ id });
  }

  async readAll() {
    return await this.pdfRepository.find();
  }

  update(id: number, entity: PdfEntity) {
    return this.pdfRepository.update({ id }, entity);
  }

  delete(id: number) {
    return this.pdfRepository.delete(id);
  }
}
