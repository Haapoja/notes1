import React, { Component } from "react";
import "./NoteForm.css";
import AceEditor from "react-ace";
import { reduxForm } from "redux-form";
import reduxAce from "../Ace/ace";



import "brace/mode/javascript";
import "brace/theme/monokai"
import ReduxAce from "../Ace/ace";

class NoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      desc: "",
      title: "",
      aceOutput: ""
    };
    this.handleUserInput = this.handleUserInput.bind(this);
    this.writeNote = this.writeNote.bind(this);


  }
  //when the user input changes, set the newnotecontent
  //to the value of whats in the input box.

  handleUserInput(e) {                 //failed? attempt at multiple forms
    console.log(e.target);
    this.setState({
      [e.target.name]: e.target.value  //value of text input //crashes with ace editor

    })
  }
  
  handleUserInput1 = (val) => {
    console.log(val);
    this.setState({
      aceOutput: val
    })
  }



  writeNote() {
    //call a method that sets the notecontent for a note to
    // the value of the input
    console.log('aceOutput is', this.state.aceOutput);
    this.props.addNote({ desc: this.state.desc, title: this.state.title, aceOutput: this.state.aceOutput }); //remember this

    //this.props.addNote(this.state.desc, this.state.title)    first attempt, didint work, no objects

    //set newnotecontent back to an empty string
    this.setState({
      newNoteContent: "",

    })


  }

  render() {
    return (

      <div className="formWrapper">
        <form onSubmit={this.handleUserInput}>

          <label>
            <input className="title"
              placeholder="title"
              type="text"
              name="title"
              // value={this.state.titleContent}
              onChange={this.handleUserInput}
            />

          </label>
          <label>
            <textarea className="noteInput1"
              type="text"
              name="desc"
              placeholder="Write a description"
              value={this.state.newNoteContent}
              onChange={this.handleUserInput}
            />
          </label>

          <form onSubmit={this.handleUserInput}>
            <AceEditor className="noteInput"
              mode="javascript"
              theme="monokai"

              name="aceOutput"
              fontSize={"20px"}
              editorProps={{ $blockScrolling: true }}
              enableBasicAutocompletion={true}
              enableLiveAutocompletion={true}
              enableSnippets={true}
              value={this.state.aceOutput}
              onChange={this.handleUserInput1}
              width={"50vh"}
              height={"50vh"}
            />
          </form>
          <button className="noteButton"
            onClick={this.writeNote}>add note </button>


        </form>


      </div>



    )
  }
}

export default NoteForm