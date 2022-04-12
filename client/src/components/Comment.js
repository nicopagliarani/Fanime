import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { API_BASE_URL } from "../consts";
import { AuthContext } from "../context/AuthProviderWrapper";
import { useContext, useEffect } from "react";


export function Comment({animeName}) {
    const [backendComments,setBackendComments] = useState([])
    const [getBackendComments, setGetBackendComments] = useState([])
    const [name,setName]= useState('')
    const [comment,setComment]=useState('')
    const { user, removeUserFromContext } = useContext(AuthContext);
    console.log("Backend Comments" , backendComments)
    console.log("Backend Comments I got", getBackendComments)
    
     const getCreatedComment= async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/getComments/${animeName}`);
                const data=response.data;
                setGetBackendComments(data.showComments);
                console.log(data.showComments)
            } catch (err) {
                console.log("We got an error");
                console.error(err);
                console.log(err.response.data);
            }
        };

        useEffect(()=>{
            
            getCreatedComment();
        },[])

       const clickHandler = async(e)=> {
        e.preventDefault(); 
                const response = await axios.post(`${API_BASE_URL}/api/createComment`, {name:user.username,comment,animeName});
                  const data = response.data;
                  console.log(data);
                  setName('');
                  setComment(''); 
                getCreatedComment();
                }


  return (
    <div className="comments">
        <h3 className="comments-title">Comments</h3>
        <form>
  <textarea value={comment} onChange={(e)=>{setComment(e.target.value)}} name="comment"></textarea><br></br>
        <button onClick={(e)=> clickHandler(e)}>Submit</button>
  </form>
        <div className="comments-container">
            {getBackendComments.map((e)=>{
                return (
                    <div>
                    <h3>{e.name}</h3>
                    <p>{e.comment}</p>
                    </div>
                )
            })}
        </div>
    </div>
  )
}


