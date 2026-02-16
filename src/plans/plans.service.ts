
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from './entities/plan.entity';
import { Subscription } from './entities/subscription.entity';
import { CreatePlanDto, CreateSubscriptionDto, UpdateSubscriptionDto } from './dto/plan.dto';
import { SubStatus, UserRole } from '../common/enums/all.enums';

@Injectable()
export class PlansService {
    constructor(
        @InjectRepository(Plan)
        private readonly planRepo: Repository<Plan>,
        @InjectRepository(Subscription)
        private readonly subRepo: Repository<Subscription>,
    ) { }

    async createPlan(dto: CreatePlanDto) {
        const plan = this.planRepo.create(dto);
        return this.planRepo.save(plan);
    }

    async getPlans(role?: UserRole) {
        const query = this.planRepo.createQueryBuilder('plan');
        if (role) {
            query.where('plan.target_role = :role', { role });
        }
        return query.getMany();
    }

    async subscribe(dto: CreateSubscriptionDto) {
        // Check if plan exists and matches user role logic would go here if we had user role check
        const plan = await this.planRepo.findOneBy({ id: dto.planId });
        if (!plan) throw new NotFoundException('Plan not found');

        // Check for existing active subscription
        const existing = await this.subRepo.findOne({
            where: {
                userId: dto.userId,
                status: SubStatus.ACTIVE,
            },
        });

        if (existing) {
            throw new BadRequestException('User already has an active subscription');
        }

        const sub = this.subRepo.create({
            ...dto,
            status: SubStatus.AWAITING_PAYMENT,
        });
        return this.subRepo.save(sub);
    }

    async getMySubscription(userId: string) {
        return this.subRepo.findOne({
            where: { userId },
            relations: ['plan'],
            order: { requestedAt: 'DESC' },
        });
    }

    async updateSubscriptionStatus(id: string, dto: UpdateSubscriptionDto) {
        const sub = await this.subRepo.findOneBy({ id });
        if (!sub) throw new NotFoundException('Subscription not found');

        Object.assign(sub, dto);
        return this.subRepo.save(sub);
    }
}
