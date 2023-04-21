import React from "react"
import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard.jsx'

export function App() {
  const users = [
    {
      userName: 'midudev',
      name: 'Miguel Hernandez',
      isFollowing: false
    },
    {
      userName: 'midudev',
      name: 'Miguel Hernandez',
      isFollowing: false
    },
    {
      userName: 'midudev',
      name: 'Miguel Hernandez',
      isFollowing: false
    }
  ]
  
  return (
    <div className="App">
      {users.map(user => {
        const { userName, name, isFollowing } = user;
        return(
          <TwitterFollowCard 
            //la key tiene q ser algo que no se repite
            key = {userName}
            initialIsFollowing={isFollowing} 
            userName = {userName}>
            {name}
          </TwitterFollowCard>
        )
      })}
    </div>
  )
}