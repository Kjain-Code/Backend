import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [notes, setnotes] = useState([])

  function fetchNotes() {
    axios.get('http://localhost:3000/notes') // api call to fetch the notes from the backend
      .then((res) => {
        setnotes(res.data.notes)
      })
  }

  useEffect(() => {
    fetchNotes()
  }, [])
  // useEffect islia use kiya hai kyoki jab bhi component render hota hai to useEffect ke andar ka code run hota hai, aur hum chahte hai ki jab component first time render ho to hi api call ho, isliye humne empty dependency array [] diya hai, jisse ki useEffect sirf first time render hone par hi chale. 
  // bina iske baar baar api call hota rahega, aur hum nahi chahte ki baar baar api call ho, isliye humne empty dependency array [] diya hai.


  function handleSubmit(e) {
    e.preventDefault() // form submit hone par page reload nahi hoga, aur hum apne code ke hisab se form submit karenge.
    const { title, description } = e.target.elements // form ke andar ke input aur textarea ke values ko destructure kar liya hai.
    console.log(title.value, description.value) // form ke andar ke input aur textarea ke values ko console me print kar diya hai.
    axios.post('http://localhost:3000/note', {
      title: title.value,
      description: description.value
    }) // api call to create a new note in the backend
      .then((res) => {
        console.log(res.data) // api call ke response ko console me print kar diya hai.
        fetchNotes() // api call ke response ke baad phir se api call karke notes ko fetch kar liya hai, taki humare frontend me updated notes show ho.
      })
  }

  function handleDelete(id) {
    axios.delete(`http://localhost:3000/note/${id}`) // api call to delete a note from the backend by using the id of the note
      .then((res) => {
        console.log(res.data) // api call ke response ko console me print kar diya hai.
        fetchNotes() // api call ke response ke baad phir se api call karke notes ko fetch kar liya hai, taki humare frontend me updated notes show ho.
      })
  }

  function handleUpdate(id) {
    const description = prompt('Enter new description') // user se new description lene ke liye prompt use kiya hai.
    axios.patch(`http://localhost:3000/note/${id}`, {
      description
    }) // api call to update a note in the backend by using the id of the note and the new description
      .then((res) => {
        console.log(res.data) // api call ke response ko console me print kar diya hai.
        fetchNotes() // api call ke response ke baad phir se api call karke notes ko fetch kar liya hai, taki humare frontend me updated notes show ho.
      })
  } 

  return (
    <>
      <form className='create-note' onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder='Enter Title' />
        <textarea name="description" placeholder='Enter Description'></textarea>
        <button type='submit'>Create Note</button>
      </form>
      <div className="notes">
        {
          notes.map((note, index) => {
            return <div className="note" key={index}>
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button onClick={()=>{handleDelete(note._id)}}>Delete</button>
              <button onClick={()=>{handleUpdate(note._id)}}>Update</button>
            </div>
          })
        }

      </div>
    </>
  )
}

export default App
