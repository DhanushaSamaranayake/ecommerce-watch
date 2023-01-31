import { verify } from "jsonwebtoken";
import { HTTP_UNAUTHORIZED } from "../constants/http_status";

export default (req:any, res:any, next:any) => {
    const token = req.headers.access_token as string;
    if(!token) return res.status(HTTP_UNAUTHORIZED).send();

    try{
        const decoded = verify(token,process.env.JWT_SECRET!);
        req.user = decoded;
    }
    catch(err){
        res.status(HTTP_UNAUTHORIZED).send();

    }
//pipe line to next middleware
    return next();
}