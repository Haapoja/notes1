import React, { Component } from "react";
import "./Note.css";
import PropTypes from "prop-types";
import PanelGroup from "react-bootstrap/lib/PanelGroup"
import Panel from "react-bootstrap/lib/Panel"
import Accordion from "react-bootstrap/lib/Accordion"
import Modal from "react-bootstrap/lib/Modal"
import Button from "react-bootstrap/lib/Button"
import AceEditor from "react-ace";
import reduxAce from "../Ace/ace";

class Note extends Component {

    constructor(props) {
        super(props);
        this.noteContent = props.noteContent;
        this.titleContent = props.titleContent;
        this.noteId = props.noteId
        this.handleRemoveNote = this.handleRemoveNote.bind(this)
        this.ModalClose = this.ModalClose.bind(this)
        this.ModalShow = this.ModalShow.bind(this)

        this.state = {
            show: false
        }

    }
    ModalClose() {
        this.setState({ show: false })
    }
    ModalShow() {
        this.setState({ show: true })
    }


    handleRemoveNote(id) {
        this.props.removeNote(id);
    }



    render(props) {
        return (
            <div className="note fade-in">
                <span className="closebtn" onClick={() => this.handleRemoveNote(this.noteId)}>
                    X
                </span>
              {/*}  <p>{JSON.stringify(this.noteContent)}</p>  */}
                <Button bsStyle="primary" onClick={this.ModalShow}>
                   <p className="noteTitle"> {this.noteContent.title}  </p>
                </Button>
                <Modal show={this.state.show} onHide={this.ModalClose}
                    dialogClassName="modal1"
                >
                    {/*} <Modal.Header closeButton className="mheader">  */}
                    <Modal.Title>
                        <p className="mtitle">
                            {this.noteContent.title}
                            <br></br>
                        </p>
                    </Modal.Title>

                    <Modal.Body >

                        {this.noteContent.desc}

                    </Modal.Body>

                    <AceEditor className="modalInput"
                        mode="javascript"
                        theme="monokai"

                        name="Unique-div"
                        fontSize={"20px"}
                        editorProps={{ $blockScrolling: true }}
                        enableBasicAutocompletion={true}
                        enableLiveAutocompletion={true}
                        enableSnippets={true}
                        readOnly={true}
                        width={"900px"}
                        height={"500px"}
                        highlightActiveLine={false}
                        value={this.noteContent.aceOutput}

                    />



                    {/*   /*}
               {/*   </Modal.Header> */}



                </Modal>

                <p>

                </p>



            </div>
        )
    }
}
Note.propTypes = {
    noteContent: PropTypes.object,

}

export default Note;

//exporting a item like this means you can import it without {}