
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './entities/city.entity';
import { Zone } from './entities/zone.entity';
import { CreateCityDto, CreateZoneDto } from './dto/location.dto';

@Injectable()
export class LocationsService {
    constructor(
        @InjectRepository(City)
        private readonly cityRepo: Repository<City>,
        @InjectRepository(Zone)
        private readonly zoneRepo: Repository<Zone>,
    ) { }

    async createCity(dto: CreateCityDto) {
        const city = this.cityRepo.create(dto);
        return this.cityRepo.save(city);
    }

    async getCities() {
        return this.cityRepo.find({ where: { isActive: true } });
    }

    async createZone(dto: CreateZoneDto) {
        const zone = this.zoneRepo.create(dto);
        return this.zoneRepo.save(zone);
    }

    async getZones(cityId: number) {
        return this.zoneRepo.find({
            where: { cityId, isActive: true },
            order: { name: 'ASC' },
        });
    }
}
