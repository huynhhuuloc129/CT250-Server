import { Controller } from '@nestjs/common';
import { CommnueService } from './commnue.service';

@Controller('commnue')
export class CommnueController {
	constructor(private readonly commnueService: CommnueService) {}
}
