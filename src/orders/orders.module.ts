
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Review } from './entities/review.entity';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Order, Review])],
    controllers: [OrdersController],
    providers: [OrdersService],
    exports: [TypeOrmModule, OrdersService],
})
export class OrdersModule { }
