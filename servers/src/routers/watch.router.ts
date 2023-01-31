import { Router } from 'express';
import { sample_users, WATCHES, watch_tags } from '../data';
import expressAsyncHandler from 'express-async-handler';
import { WatchModel } from '../models/watch.model';
const router = Router();

router.get('/seed', expressAsyncHandler(async (req, res) => {
    const watchCount = await WatchModel.countDocuments();
    if(watchCount>0){
        res.send({message:"Data already done..!"});
        return;
    }

    await WatchModel.create(WATCHES);
    res.send({message:"Data created..!"});
}));


router.get('/', expressAsyncHandler(
    async (req, res) => {

        const watchs = await WatchModel.find();
        //res.send("Hello World")
        res.send(watchs);
    }
));
router.get("/search/:searchTerm", expressAsyncHandler(
    async(req,res)=>{
        const searchRegex = new RegExp(req.params.searchTerm,"i");
        const watchs = await WatchModel.find({name:{ $regex: searchRegex }});
        //const searchTerm = req.params.searchTerm;
        //const result = WATCHES.filter(watch => watch.name.toLowerCase().includes(searchTerm.toLowerCase()));
        res.send(watchs);
    }
))

router.get("/tags",expressAsyncHandler(
    async(req,res)=>{
        const tags = await WatchModel.aggregate([
            {$unwind:"$tags"},
            {$group:{_id:"$tags",count:{$sum:1}}},
            {$project:{_id:0,name:"$_id",count:'$count'}}
        ]).sort({count:-1});

        const all = {
            name:"All",
            count:await WatchModel.countDocuments()
        }

        tags.unshift(all);

        res.send(tags);
    }
))

router.get("/tags/:tag", expressAsyncHandler(
    async (req,res)=>{
        const watchs = await WatchModel.find({tags:req.params.tag});
        //const tag = req.params.tag;
        //const result = WATCHES.filter(watch => watch.tags?.includes(tag));
        res.send(watchs);
    }
))

router.get("/:id",expressAsyncHandler(
    async (req,res)=>{
        const watch = await WatchModel.findById(req.params.id);
        //const id = req.params.id;
        //const result = WATCHES.find(watch => watch.id === id);
        res.send(watch);
    }
))

export default router;