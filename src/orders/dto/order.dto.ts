
import { OrderStatus } from '../../common/enums/all.enums';

export class CreateOrderDto {
    customerName: string;
    originZoneId?: number;
    destZoneId?: number;
    pickupAddress?: string;
    deliveryAddress: string;
    totalAmount: number;
    deliveryFee: number;
    items?: any;
}

export class UpdateOrderDto {
    status?: OrderStatus;
    riderId?: string;
    pickupTime?: Date;
    dropoffTime?: Date;
    proofPhotoUrl?: string;
    returnReason?: string;
}

export class CreateReviewDto {
    orderId: string;
    reviewedId: string;
    score: number;
    comment?: string;
}
