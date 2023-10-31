import { ApiHideProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { ROOMING_SUBSCRIPTION_REQUEST_STATE } from 'src/shared/enums/common.enum';

export class CreateRoomingSubscriptionRequestDto {
	@ApiHideProperty()
	@IsOptional()
	tenantId?: number;

	@ApiHideProperty()
	@IsOptional()
	roomId?: number;

	@ApiHideProperty()
	state: ROOMING_SUBSCRIPTION_REQUEST_STATE;
}
