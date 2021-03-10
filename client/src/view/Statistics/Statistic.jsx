import React, { useEffect, useState } from 'react'; 
import io from 'socket.io-client';
let socket;

export default function Statistic(){


    useEffect(() => {
       
        socket = io('localhost:3000',{
            transports: ["websocket", "polling"]
        },[]);
        
        socket.on('/realTime/about').emit('join', 'Empezamos bien');      

        return () => {
            socket.emit('disconnects');
            socket.off();
        }
        
    },[])

    useEffect(() => {    
        socket.on('initial', (initial)=>{
            console.log(initial)
        });   
        
        socket.on('update', (update) => {
            console.log(update)                      
        })

    },[])


    return (
        <div>
            Hola
        </div>
    )

}
