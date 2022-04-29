import './leftSection.css';
import axios from "axios";
import React, { useState, useContext, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';

import { AuthContext } from "../../context/AuthContext";

function LeftSection () {
    const [showPostModal, setShowPostModal] = useState(false);
    const handleClosePostForm = () => {
        setShowPostModal(false);
        setIsIdeaPosted(false)
    }
    const handleShowPostForm = () => setShowPostModal(true);

    const [showTermsModal, setShowTermsModal] = useState(false);
    const handleCloseTermsForm = () => setShowTermsModal(false);
    const handleShowTermsForm = () => setShowTermsModal(true);

    const { user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    // post Idea
    const addTitle = useRef("")
    const addDesc = useRef("")
    const addCategoryId = useRef("")
    
    const [selectedCategories, setSelectedCategories] = useState([])
    const options = [
        { value: '625471b6de3b73d4f3fc2360', label: 'IoT' },
        { value: '62547239de3b73d4f3fc2362', label: 'AI' },
        { value: '6254728bde3b73d4f3fc2364', label: 'HRM' },
      ];

    const [selectedFiles, setSelectedFiles] = useState([]);
    const handleFileSelect = (event) => {
        setSelectedFiles(event.target.files)
      }

    const handleAddIdea = async (e) => {
        e.preventDefault();
        const isError = false
        if (addTitle.current.value.length > 50) 
        {
            addDesc.current.setCustomValidity("Title must not exceed 50 characters");
            isError = true
        }
        if (addDesc.current.value.length > 500) 
        {
            addDesc.current.setCustomValidity("Description must not exceed 500 characters");
            isError = true
        }
        if(isError == false) {
            const body = {
                posterId: user._id,
                title: addTitle.current.value,
                desc: addDesc.current.value,
                categoryId: addCategoryId.current.value,
            };
            try {
                const formData = new FormData();
                for(var i = 0; i < selectedFiles.length; i++) {
                    formData.append("ideaDocs", selectedFiles[i])
                }
                // await axios.post("/ideas/add", formData , body);
                await axios.post("/ideas/add", body).then(res => {
                    console.log(res.data)
                    setIdeaId(res.data._id)
                })
                showFileInput()
              } catch (err) {
                console.log(err);
              }
          }
    }

    const [isIdeaPosted, setIsIdeaPosted] = useState(false)
    const [ideaId, setIdeaId] = useState("")
    const showFileInput = () => {
        setIsIdeaPosted(true)
    }
    const closeFileInput = () => {
        setIsIdeaPosted(false)
    }
    const fileInput = (showInput) => {
        if(showInput == true) {
            return (
            <div className="grid-container">
                <input name="ideaDocs" type="file" accept=".docx,.pdf" multiple onChange={handleFileSelect}/>
            </div>
        )
        }
    }
    const handleButtons = (showInput) => {
        if(showInput== true) {
            return (
            <Button className="myCustomFooterButton" onClick={handleChangeFiles} variant="primary">
                Upload Files
            </Button>
            )
        } else {
            return (
            <Button className="myCustomFooterButton" onClick={handleAddIdea} variant="primary">
                Post Idea
            </Button>
            )
        }
    }

    const handleChangeFiles = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            for(var i = 0; i < selectedFiles.length; i++) {
                formData.append("ideaDocs", selectedFiles[i])
            }
            await axios.put("/ideas/changeIdeaFiles/" + ideaId , formData,{});
            closeFileInput()
            handleClosePostForm()
            } catch (err) {
            console.log(err);
            }
    }

    return (
        <div className="leftSection">
                <img className="paddingBottom userAvatar"  src={user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"} alt=""></img>
                <Button 
                onMouseOver = {({target}) => target.style.backgroundColor="#008080"}
                onMouseOut = {({target}) => target.style.backgroundColor="#009999"}
                className="postButton"
                onClick={handleShowTermsForm}>Post Idea</Button>
                {/* Post Idea */}
                <Modal className="myModal" show={showPostModal} onHide={handleClosePostForm}>
                <Modal.Header className="modalHeader" closeButton>
                    <Modal.Title className="modalTitle">Post Idea</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="grid-container">
                            <label className="myCustomlabel item1">Idea Title:</label>
                            <textarea className="myCustomTextArea item2" ref={addTitle} placeholder="Title here" required type="text"/>
                        </div>
                        <div className="grid-container">
                            <label className="myCustomlabel item1">Idea Description:</label>
                            <textarea className="myCustomTextArea item2" ref={addDesc} placeholder="Description here" required type="text"/>
                        </div>
                        <div className="grid-container">
                            <label className="myCustomlabel item1">Category:</label>
                            <select ref={addCategoryId}>
                                <option value="625471b6de3b73d4f3fc2360">IoT</option>
                                <option value="62547239de3b73d4f3fc2362">AI</option>
                                <option value="6254728bde3b73d4f3fc2364">HRM</option>
                            </select>
                        </div>
                        {fileInput(isIdeaPosted)}
                        {handleButtons(isIdeaPosted)}
                        <Button className="myCustomFooterButton" variant="secondary" onClick={handleClosePostForm}>
                            Cancel
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>
            {/* Terms and conditions modal */}
            <Modal className="myModal" show={showTermsModal} onHide={handleCloseTermsForm}>
                <Modal.Header className="modalHeader" closeButton>
                    <Modal.Title className="modalTitle">Terms And Conditions</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <div>
                        Do note that your post and the content therein, including your ideas are not subject to copyright laws, and as such can be used by other parties who may have access to it.
                        </div>
                        <Button className="myCustomFooterButton" variant="primary" onClick={() => {
                            handleCloseTermsForm()
                            handleShowPostForm()}}>
                            I Accept
                        </Button>
                        <Button className="myCustomFooterButton" variant="secondary" onClick={handleCloseTermsForm}>
                            Cancel
                        </Button>
                </Modal.Body>
            </Modal>
            </div>
    )
}
export default LeftSection;