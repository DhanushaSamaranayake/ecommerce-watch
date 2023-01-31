import { Schema,model } from "mongoose";

export interface User {
    id:string;
    name:string;
    email:string;
    password:string;
    address:string;
    isAdmin:boolean;
}

export const userSchema = new Schema<User>(
    {
        name: {type:String, required:true},
        email: {type:String, required:true, unique:true},
        password: {type:String, required:true},
        address: {type:String, required:true},
        isAdmin: {type:Boolean, default:false},
    },
    {
        timestamps:true,
        toJSON:{
            virtuals:true,
        },
        toObject:{
            virtuals:true,
        },
    }
);

export const UserModel = model<User>('User',userSchema);