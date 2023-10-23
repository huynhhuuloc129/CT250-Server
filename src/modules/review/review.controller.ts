import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/utils';
import { Review } from './entities/review.entity';
import { GetCurrentUser } from '../auth/decorators/get-current-user.decorator';
import { USER_ROLE, User } from '../users/entities/user.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { RequiredRoles } from '../auth/decorators/required-roles.decorator';

@Controller('reviews')
@ApiTags('reviews')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

	@Get('me')
	@ApiBearerAuth('bearer')
	@ApiOperation({ summary: 'Find many review of current user' })
	async findManyByCurrentUser(
		@GetCurrentUser('id') userId: number,
	): Promise<Review[]> {
		return await this.reviewService.findMany({
			tenant: { user: { id: userId } },
		});
	}

	@Get()
	@Public()
	@ApiOperation({ summary: 'Find many reviews' })
	async findMany(): Promise<Review[]> {
		return await this.reviewService.findMany();
	}

	@Get('rooms/:roomId')
	@Public()
	@ApiOperation({ summary: 'Find many review by room id' })
	async findManyByRoomId(
		@Param('roomId', ParseIntPipe) roomId: number,
	): Promise<Review[]> {
		return await this.reviewService.findMany({ room: { id: roomId } });
	}

	@Get(':reviewId')
	@Public()
	@ApiOperation({ summary: 'Find one review' })
	async findOne(
		@Param('reviewId', ParseIntPipe) reviewId: number,
	): Promise<Review> {
		return await this.reviewService.findOneById(reviewId);
	}

	@Post('rooms/:roomId/me')
	@ApiBearerAuth('bearer')
	@RequiredRoles(USER_ROLE.tenant)
	@ApiOperation({ summary: 'Current user create one their review' })
	async currentUserCreateOne(
		@GetCurrentUser() user: User,
		@Param('roomId', ParseIntPipe) roomId: number,
		@Body() createDto: CreateReviewDto,
	): Promise<Review> {
		return await this.reviewService.currentUserCreateOne(
			user,
			createDto,
			roomId,
		);
	}

	@Patch(':reviewId/me')
	@RequiredRoles(USER_ROLE.tenant)
	@ApiBearerAuth('bearer')
	@ApiOperation({ summary: 'Current user update one their review' })
	async currentUserUpdateOne(
		@GetCurrentUser('id', ParseIntPipe) userId: number,
		@Param('reviewId', ParseIntPipe) reviewId: number,
		@Body() updateDto: UpdateReviewDto,
	): Promise<Review> {
		return await this.reviewService.currentUserUpdateOneByCondititon(
			userId,
			{ id: reviewId },
			updateDto,
		);
	}

	@Delete(':reviewId/me')
	@RequiredRoles(USER_ROLE.tenant)
	@ApiBearerAuth('bearer')
	@ApiOperation({ summary: 'Current user delete one their review' })
	async currentUserDeleteOne(
		@GetCurrentUser('id', ParseIntPipe) userId: number,
		@Param('reviewId', ParseIntPipe) reviewId: number,
	): Promise<object> {
		return await this.reviewService.currentUserdeleteOneById(userId, reviewId);
	}
}
