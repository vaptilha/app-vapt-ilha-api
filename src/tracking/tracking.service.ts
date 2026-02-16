
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DriverTracking } from './entities/driver-tracking.entity';
import { UpdateLocationDto } from './dto/tracking.dto';

@Injectable()
export class TrackingService {
    constructor(
        @InjectRepository(DriverTracking)
        private readonly trackingRepo: Repository<DriverTracking>,
    ) { }

    async updateLocation(riderId: string, dto: UpdateLocationDto) {
        let tracking = await this.trackingRepo.findOneBy({ riderId });
        if (!tracking) {
            tracking = this.trackingRepo.create({ riderId, isOnline: true });
        }

        tracking.lastLat = dto.lat;
        tracking.lastLng = dto.lng;
        tracking.isOnline = true;

        return this.trackingRepo.save(tracking);
    }

    async getLocation(riderId: string) {
        const tracking = await this.trackingRepo.findOneBy({ riderId });
        if (!tracking) throw new NotFoundException('Tracking info not found');
        return tracking;
    }
}
