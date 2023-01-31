import {connect, ConnectOptions} from 'mongoose';

export const connectDB = () => {
    connect(process.env.MONGO_URI!,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    } as ConnectOptions).then(()=>
        console.log("Connected to MongoDB")
    ).catch(err => console.log(err));
}
