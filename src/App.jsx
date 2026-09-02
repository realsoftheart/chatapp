import React, { useState } from 'react'
import { BrowserRouter  as Router, Route, Switch, } from "react-router-dom";
import './App.css';
import chat from './chat';
import Login from './Login';
import Sidebar from '/Sidebar';
import { useStateValue } from './useStateValue';

function App() {
  const [{ user }, dispatch] = useStateValue();

  return ( 
    <div className = "App">
      {!user ? (
        <Login/>
      ) : (
         <div className = 'app_body'>
           <Router>
             <Sidebar />
             <Switch>
               <Router path='/room/ :roomId'>
               <chat />
               </Route>
               
               <Route path="/"></Route>
             </Switch>
           </Router>
          </div>
             
      )
      }
    </div>
  )
}
  
