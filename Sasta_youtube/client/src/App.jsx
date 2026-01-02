  import React ,{ useState , useEffect} from 'react'
  import axios from "axios";
  import VideoPlayer from "./Video.jsx"
  import Navbar from './Navbar.jsx';

  function App() {
    const [text , settext] = useState("")
    const [videoId , setVideoID] = useState("")
    const url='http://localhost:3000'


    async function search(searchItem){
      const response= await axios.get(url+"/search" , {
        params : {searchitem : searchItem}
      })
      const videodata= response.data
      const videoId  = videodata[0].videoId
      return videoId
    }

  async function handle_search(text){
        const videoID = await search(text);
        setVideoID(videoID);
      }
  

    return (
      <div>
        <Navbar function={handle_search}/>      
        <VideoPlayer videoId={videoId} />
      </div>
      
    )
  }

  export default App
