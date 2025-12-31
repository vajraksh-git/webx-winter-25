import React , { useEffect,useState } from 'react'
import axios from 'axios'
import Login from './Login.jsx'
import Item from './Item.jsx'
import './App.css'

function App() {
  const [currentuser , setCurrentUser ] = useState(null)
  const [ items , setItems ] = useState([]) 
  const [text , setText ] = useState("")
  const url = "https://keeper-backend-vj.onrender.com"
  //------------adding and deleting items functions----------------//
  async function fetchData(){
    try{
      const response = await axios.get(url+"/users" , {
        params : {username : currentuser}
      });
      const tasks = response.data;
      const taskwithid = tasks.map( eachtask => eachtask );
      setItems(taskwithid);
    } catch (error){
      console.error("Error fetching tasks:", error);
    }
  }

  useEffect ( () => {
    if(currentuser){
      fetchData();
    }
  } , [currentuser] )



  function additem(item){
    setItems(prevItems => [...prevItems , item])
  }

  function handleAddItemOnClick(){
    if(text=== "") return;
    setText("")
    axios.post(url+"/tasks" , {
      username : currentuser,
      task : text}).then( response => {
        console.log("Task added:", response.data);
        additem({__id : response.data.id , task :text});
      }).catch( error => {
        console.error("There was an error adding the task!", error);
      });
  }

  function handleEnterKeyPress(event){
    if(event.key === "Enter"){
      handleAddItemOnClick()
    }
  }

  function deleteItem(idTODelete){
    axios.delete(url+"/tasks:id" , {
      data : {
        username : currentuser,
        taskIndex : idTODelete
      }})
    setItems(prevItems => prevItems.filter((item,index) => item._id !== idTODelete))
  }
  //---------------------------------------------------------------//




  //---------------login page handeling-------------------//  
  function handleLogin(username){
    axios.get(`${url}/users?username=${username}`).then( response => {
      const tasks = response.data;
    })
    fetchData();
    setCurrentUser(username);
  }
  //-----------------------------------------------------//
  if(!currentuser){
    return <Login onClick={handleLogin}/>
  }
  return <div>
    <div className="dashboard">
      <h1>Keeper-APP</h1>
      <div className="profile">
        <label className="username">{currentuser}</label>
        <button onClick={() => setCurrentUser(null)} className="logout">Logout</button>
      </div>
    </div>
      <div className="add-items-container">
        <button onClick={handleAddItemOnClick} className="add-btn">ADD</button>
        <input onKeyDown={handleEnterKeyPress} value={text} onChange={(event)=> setText(event.target.value)} className="item-input" type="text" placeholder="New Item"/>
      </div>
    
    <div className="items-container">
      {items.map((item , index) => <Item onDelete={() => deleteItem(item._id)} key={item._id} text={item.task} />)}
    </div>
  </div>

}

export default App
