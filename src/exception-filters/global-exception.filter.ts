import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
	private logger = new Logger(GlobalExceptionFilter.name);
	catch(exception: any, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();

		const status =
			exception instanceof HttpException ? exception.getStatus() : 500;

		const message =
			exception instanceof HttpException
				? exception.message
				: 'Internal server error';
		this.logger.log(exception);
		console.log(exception);
		response.status(status).json({
			statusCode: status,
			message,
			error: {
				response: exception.response,
				stack: exception.stack,
			},
		});
	}
}
