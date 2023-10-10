import { Controller } from '@nestjs/common';
import { LessorService } from './lessor.service';

@Controller('lessor')
export class LessorController {
	constructor(private readonly lessorService: LessorService) {}
}
