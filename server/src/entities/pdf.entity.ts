import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Pdf' })
export class PdfEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  Firstname: string;

  @Column({ type: 'varchar' })
  Lastname: string;

  @Column({ type: 'varchar' })
  Email: string;

  @Column({ type: 'varchar' })
  Phone: string;
}
