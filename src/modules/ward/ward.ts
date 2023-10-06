import { Controller } from '@nestjs/common';
import { CommnueService } from './ward.service';

@Controller('commnue')
export class CommnueController {
	constructor(private readonly commnueService: CommnueService) {}
}
