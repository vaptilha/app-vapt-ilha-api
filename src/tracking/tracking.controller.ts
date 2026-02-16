
import { Controller, Get, Patch, Body, Param, UseGuards, Req } from '@nestjs/common';
import { TrackingService } from './tracking.service';
import { UpdateLocationDto } from './dto/tracking.dto';
import { SupabaseAuthGuard } from '../common/guards/supabase-auth.guard';

@Controller('tracking')
export class TrackingController {
    constructor(private readonly trackingService: TrackingService) { }

    @UseGuards(SupabaseAuthGuard)
    @Patch('me')
    async updateLocation(@Req() req: any, @Body() dto: UpdateLocationDto) {
        return this.trackingService.updateLocation(req.user.sub, dto);
    }

    @UseGuards(SupabaseAuthGuard)
    @Get(':riderId')
    async getLocation(@Param('riderId') riderId: string) {
        return this.trackingService.getLocation(riderId);
    }
}
