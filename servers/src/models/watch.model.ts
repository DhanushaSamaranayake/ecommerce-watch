import {Schema, model} from 'mongoose';

export interface Watch {
    id:string;
    name:string;
    price:number;
    tags: string[];
    favorite:boolean;
    imageUrl: string;
    origins: string[];
}

export const watchSchema = new Schema<Watch>(
    {
        name: {type:String, required:true},
        price: {type:Number, required:true},
        tags: {type:[String]},
        favorite: {type:Boolean, default:false},
        imageUrl: {type:String, required:true},
        origins: {type:[String], required:true},
    },
    {
        toJSON:{
            virtuals:true,
        },
        toObject:{
            virtuals:true,
        },
        timestamps:true,
    }
);

export const WatchModel = model<Watch>('Watch',watchSchema);
