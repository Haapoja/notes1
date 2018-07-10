import React, { Component } from 'react';

import './App.css';
import Note from "./note/Note";
import NoteForm from "./noteform/NoteForm";
import { DB_CONFIG } from "./config/config";
import firebase from "firebase/app";
import "firebase/database";



class App extends Component {

  constructor(props) {
    super(props);
    this.addNote = this.addNote.bind(this)
    this.removeNote = this.removeNote.bind(this)

    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app.database().ref().child("notes");

    //setup the react state of our component
    this.state = {
      notes: [],

    }
  }

  componentWillMount() {
    const prevNotes = this.state.notes;


    //datasnapshot
    this.database.on("child_added", snap => {
      prevNotes.push({
        id: snap.key,
        noteContent: snap.val().noteContent,
      })

      this.setState({
        notes: prevNotes
      })
    })
    this.database.on("child_removed", snap => {
      for (var i = 0; i < prevNotes.length; i++) {
        if (prevNotes[i].id === snap.key) {
          prevNotes.splice(i, 1);
        }
      }
      this.setState({
        notes: prevNotes
      })
    })
  }


  addNote(note) {
    this.database.push().set({ noteContent: note });
  }
  removeNote(noteId) {
    this.database.child(noteId).remove();
  }

  render() {
    return (
      <div className="notesWrapper">
        <div className="notesHeader">
          <div className="heading">Cheatsheet </div>
          
          <div >
          <NoteForm addNote={this.addNote} />
        </div>
        </div>
        <div className="notesBody">
          {
            this.state.notes.map((note) => {
              return (
                <Note noteContent={note.noteContent}
                  noteId={note.id}
                  key={note.id}
                  removeNote={this.removeNote} />

                  
              )
            })
          }


        </div>
        
      </div>
    );
  }
}

export default App;
