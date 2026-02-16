
export class CreateCityDto {
    name: string;
    isActive?: boolean;
}

export class UpdateCityDto {
    name?: string;
    isActive?: boolean;
}

export class CreateZoneDto {
    cityId: number;
    name: string;
    lat?: number;
    lng?: number;
    isActive?: boolean;
}

export class UpdateZoneDto {
    cityId?: number;
    name?: string;
    lat?: number;
    lng?: number;
    isActive?: boolean;
}
