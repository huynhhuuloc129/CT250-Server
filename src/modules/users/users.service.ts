import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateTenantDto } from '../tenant/dto/create-tenant.dto';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { randomBytes, scrypt, timingSafeEqual } from 'crypto';
import { promisify } from 'util';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User) private usersRepository: Repository<User>,
	) {}

	async hashData(data: string): Promise<string> {
		const scryptAsync = promisify(scrypt);
		const salt = randomBytes(16).toString('hex');
		const buf = (await scryptAsync(data, salt, 64)) as Buffer;
		return `${buf.toString('hex')}.${salt}`;
	}

	async verifyData(storedData: string, plainData: string): Promise<boolean> {
		const scryptAsync = promisify(scrypt);
		const [hashedData, salt] = `${storedData}`.split('.');
		const hashedPasswordBuf = Buffer.from(hashedData, 'hex');
		const suppliedPasswordBuf = (await scryptAsync(
			plainData,
			salt,
			64,
		)) as Buffer;
		return timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf);
	}

	async createOne(
		createDto: CreateUserDto | CreateTenantDto | CreateAdminDto,
	): Promise<User> {
		const isExist = await this.usersRepository.findOne({
			where: [{ email: createDto.email }, { username: createDto.username }],
		});

		if (isExist) {
			throw new NotFoundException('Your email or username already exist');
		}

		createDto.password = await this.hashData(createDto.password);

		const newEntity = this.usersRepository.create(createDto);

		return await this.usersRepository.save(newEntity);
	}

	async findOneById(id: number): Promise<User> {
		return await this.usersRepository.findOne({
			where: { id },
			relations: {
				tenant: true,
				lessor: true,
			},
		});
	}

	async findOneByCondititon(filter: object | object[]): Promise<User> {
		return await this.usersRepository.findOne({
			where: filter,
			relations: {
				tenant: true,
				lessor: true,
			},
		});
	}

	async findMany(): Promise<User[]> {
		return this.usersRepository.find({
			relations: {
				tenant: true,
				lessor: true,
			},
		});
	}

	async updateOneByCondititon(
		filter: object | object[],
		updateDto: UpdateUserDto,
	): Promise<User> {
		const entity = await this.usersRepository.findOne({ where: filter });

		if (!entity) {
			throw new NotFoundException(`Not found user`);
		}

		return await this.usersRepository.save({
			...entity,
			...updateDto,
		});
	}

	async deleteOneById(id: number): Promise<object> {
		return await this.usersRepository.delete(id);
	}
}
