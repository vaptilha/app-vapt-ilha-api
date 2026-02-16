
import { Controller, Get, Post, Body, Patch, Param, UseGuards, Query, Req } from '@nestjs/common';
import { PlansService } from './plans.service';
import { CreatePlanDto, CreateSubscriptionDto, UpdateSubscriptionDto } from './dto/plan.dto';
import { SupabaseAuthGuard } from '../common/guards/supabase-auth.guard';
import { UserRole } from '../common/enums/all.enums';

@Controller('plans')
export class PlansController {
    constructor(private readonly plansService: PlansService) { }

    @Get()
    async getPlans(@Query('role') role?: UserRole) {
        return this.plansService.getPlans(role);
    }

    @UseGuards(SupabaseAuthGuard)
    @Get('subscriptions/my')
    async getMySubscription(@Req() req: any) {
        const userId = req.user.sub; // Assuming Supabase JWT subject is user ID
        return this.plansService.getMySubscription(userId);
    }

    @UseGuards(SupabaseAuthGuard)
    @Post('subscribe')
    async subscribe(@Body() dto: CreateSubscriptionDto, @Req() req: any) {
        dto.userId = req.user.sub;
        return this.plansService.subscribe(dto);
    }

    // Admin routes
    @UseGuards(SupabaseAuthGuard)
    @Post()
    async createPlan(@Body() dto: CreatePlanDto) {
        return this.plansService.createPlan(dto);
    }

    @UseGuards(SupabaseAuthGuard)
    @Patch('subscriptions/:id/status')
    async updateSubscriptionStatus(
        @Param('id') id: string,
        @Body() dto: UpdateSubscriptionDto,
    ) {
        return this.plansService.updateSubscriptionStatus(id, dto);
    }
}
