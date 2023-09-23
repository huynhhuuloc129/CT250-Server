import { BaseObject } from 'src/shared/entities/base-object.entity';
import { Entity } from 'typeorm';

@Entity()
export class Tenant extends BaseObject {}
