import React, { useState } from 'react'
import axios from 'axios'

const App = () => {
  const [notes, setnotes] = useState([
    {
      title: "test title",
      description: "test description"
    },
    {
      title: "test title",
      description: "test description"
    },
    {
      title: "test title",
      description: "test description"
    },
    {
      title: "test title",
      description: "test description"
    },

  ])

  axios.get('http://localhost:3000/notes')
  .then((res)=>{
    setnotes(res.data.notes)
  })
  return (
    <div className="notes">
      {
        notes.map((note,index) => {
          return <div className="note" key={index}>
            <h1>{note.title}</h1>
            <p>{note.description}</p>
          </div>
        })
      }

    </div>
  )
}

export default App
