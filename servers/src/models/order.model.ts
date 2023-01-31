import {model, Schema,Types} from 'mongoose';
import { OrderStatus } from '../constants/order_status';
import { Watch, watchSchema } from './watch.model';

export interface LatLng{
    lat:string;
    lng:string;
}

export const LatLngSchema = new Schema<LatLng>({
    lat:{type:String,required:true},
    lng:{type:String,required:true}
});

export interface OrderItem{
    watch:Watch;
    quantity:number;
    price:number;
}

export const OrderItemSchema = new Schema<OrderItem>({
    watch:{type:watchSchema,required:true},
    quantity:{type:Number,required:true},
    price:{type:Number,required:true},
});

export interface Order{
    id: number;
    items: OrderItem[];
    totalPrice: number;
    name: string;
    address: string;
    addressLatLng: LatLng;
    paymentId: string;
    createdAt:string;
    status:OrderStatus;
    user:Types.ObjectId;
    updatedAt:Date;
  
  }
  
    export const OrderSchema = new Schema<Order>({
        items:{type:[OrderItemSchema],required:true},
        totalPrice:{type:Number,required:true},
        name:{type:String,required:true},
        address:{type:String,required:true},
        addressLatLng:{type:LatLngSchema,required:true},
        paymentId:{type:String},
        status:{type:String,default:OrderStatus.NEW},
        user:{type:Schema.Types.ObjectId,required:true},

    },{
        timestamps:true,
        toJSON:{
            virtuals:true,
        },
        toObject:{
            virtuals:true,
        }
    }
    );

    export const OrderModel = model('Order',OrderSchema);