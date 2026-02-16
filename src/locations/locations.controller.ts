
import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateCityDto, CreateZoneDto } from './dto/location.dto';
import { SupabaseAuthGuard } from '../common/guards/supabase-auth.guard';

@Controller('locations')
export class LocationsController {
    constructor(private readonly locationsService: LocationsService) { }

    @Get('cities')
    async getCities() {
        return this.locationsService.getCities();
    }

    @Get('zones')
    async getZones(@Query('cityId') cityId: string) {
        return this.locationsService.getZones(+cityId);
    }

    // Admin routes - protected
    @UseGuards(SupabaseAuthGuard)
    @Post('cities')
    async createCity(@Body() dto: CreateCityDto) {
        return this.locationsService.createCity(dto);
    }

    @UseGuards(SupabaseAuthGuard)
    @Post('zones')
    async createZone(@Body() dto: CreateZoneDto) {
        return this.locationsService.createZone(dto);
    }
}
