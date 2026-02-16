
import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto, UpdateOrderDto, CreateReviewDto } from './dto/order.dto';
import { OrderStatus, UserRole } from '../common/enums/all.enums';
import { Review } from './entities/review.entity';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepo: Repository<Order>,
        @InjectRepository(Review)
        private readonly reviewRepo: Repository<Review>,
    ) { }

    async create(dto: CreateOrderDto, merchantId: string) {
        const order = this.orderRepo.create({
            ...dto,
            merchantId,
            status: OrderStatus.PENDING,
            deliveryFee: 10.0, // simplified logic
            riderEarnings: 8.0, // simplified logic
        });
        return this.orderRepo.save(order);
    }

    async findAll(role: UserRole, userId: string, status?: OrderStatus) {
        const query = this.orderRepo.createQueryBuilder('order');

        if (role === UserRole.MERCHANT) {
            query.where('order.merchant_id = :userId', { userId });
        } else if (role === UserRole.RIDER) {
            // Riders see available orders (PENDING/PREPARING) OR orders assigned to them
            query.where(
                '(order.rider_id = :userId) OR (order.rider_id IS NULL AND order.status IN (:...openStatuses))',
                { userId, openStatuses: [OrderStatus.READY, OrderStatus.PREPARING] }
            );
        }

        if (status) {
            query.andWhere('order.status = :status', { status });
        }

        query.orderBy('order.created_at', 'DESC');
        return query.getMany();
    }

    async findOne(id: string) {
        const order = await this.orderRepo.findOne({
            where: { id },
            relations: ['merchant', 'rider', 'originZone', 'destZone'],
        });
        if (!order) throw new NotFoundException('Order not found');
        return order;
    }

    async updateStatus(id: string, status: OrderStatus, userId: string, role: UserRole) {
        const order = await this.findOne(id);

        // Basic permission check (can be expanded)
        if (role === UserRole.RIDER && order.riderId !== userId && status !== OrderStatus.PICKING_UP) {
            // Allow rider to "Pick Up" (Accept) an order if it's open
            if ((status as OrderStatus) === OrderStatus.PICKING_UP && !order.riderId) {
                // Rider accepting order
                order.riderId = userId;
            } else {
                throw new ForbiddenException('You cannot update this order');
            }
        }

        order.status = status;
        return this.orderRepo.save(order);
    }

    async assignRider(id: string, riderId: string) {
        const order = await this.findOne(id);
        order.riderId = riderId;
        order.status = OrderStatus.PICKING_UP;
        return this.orderRepo.save(order);
    }

    async createReview(dto: CreateReviewDto, reviewerId: string) {
        const review = this.reviewRepo.create({
            ...dto,
            reviewerId,
        });
        return this.reviewRepo.save(review);
    }
}
