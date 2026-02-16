
import { Controller, Get, Post, Body, Patch, Param, UseGuards, Req, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderDto, CreateReviewDto } from './dto/order.dto';
import { SupabaseAuthGuard } from '../common/guards/supabase-auth.guard';
import { OrderStatus, UserRole } from '../common/enums/all.enums';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @UseGuards(SupabaseAuthGuard)
    @Post()
    async create(@Req() req: any, @Body() dto: CreateOrderDto) {
        return this.ordersService.create(dto, req.user.sub);
    }

    @UseGuards(SupabaseAuthGuard)
    @Get()
    async findAll(@Req() req: any, @Query('status') status?: OrderStatus) {
        // We'd ideally fetch the user role from DB or JWT metadata
        // For now assuming role is passed in header or we fetch it (simplified)
        const role = req.user.user_metadata?.role || UserRole.MERCHANT;
        return this.ordersService.findAll(role, req.user.sub, status);
    }

    @UseGuards(SupabaseAuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.ordersService.findOne(id);
    }

    @UseGuards(SupabaseAuthGuard)
    @Patch(':id/status')
    async updateStatus(
        @Param('id') id: string,
        @Body('status') status: OrderStatus,
        @Req() req: any,
    ) {
        const role = req.user.user_metadata?.role || UserRole.MERCHANT;
        return this.ordersService.updateStatus(id, status, req.user.sub, role);
    }

    @UseGuards(SupabaseAuthGuard)
    @Post(':id/reviews')
    async createReview(
        @Param('id') id: string,
        @Body() dto: CreateReviewDto,
        @Req() req: any,
    ) {
        dto.orderId = id;
        // Reviewed ID logic needs to be inferred or passed
        return this.ordersService.createReview(dto, req.user.sub);
    }
}
