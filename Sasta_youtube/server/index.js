import ytdl from "@distube/ytdl-core";
import yt_Search from "yt-search";
import express from "express";
import cors from "cors";

const port=3000;
const App= express();




async function search(params) {
    const result= await yt_Search(params);
    const videos = result.videos.slice(0,5);
    return videos;
}

App.use(express.json());
App.use(cors());

App.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


App.get("/search" , async(req , res)=> {
    const searchitem= req.query.searchitem;
    const result = await search(searchitem);
    res.status(201).json(result);
})