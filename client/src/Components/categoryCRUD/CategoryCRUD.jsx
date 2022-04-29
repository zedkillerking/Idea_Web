import './categoryCRUD.css'
import axios from "axios";
import { IoAddCircleSharp} from "react-icons/io5";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { BiDetail } from "react-icons/bi";
import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from "react-router";
// to install: npm install react-bootstrap bootstrap@5.1.3
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { AuthContext } from "../../context/AuthContext";
function CategoryCRUD () {
    const { user} = useContext(AuthContext);

    const [categoryId, setCategoryId] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [categoryDesc, setCategoryDesc] = useState("");
    // Add modal
    const [showAddModal, setShowAddModal] = useState(false);
    const handleCloseAddForm = () => setShowAddModal(false);
    const handleShowAddForm = () => setShowAddModal(true);

    const addName = useRef()
    const addDesc= useRef()

    const handleAddCategory = async (e) => {
        e.preventDefault();
        if (addName.current.value.length > 50) 
        {
            addName.current.setCustomValidity("Name must not exceed 50 characters");
        }
        if (addDesc.current.value.length> 500) {
            addDesc.current.setCustomValidity("Description must not exceed 500 characters");
        }
        if(addName.current.value.length <= 50 && addDesc.current.value.length <= 500) {
            const body = {
              name: addName.current.value,
              desc: addDesc.current.value,
            };
            try {
              await axios.post("/categories/add", body);
              setReset(!reset)
              handleCloseAddForm()
            } catch (err) {
              console.log(err);
            }
          }
    }

    // Delete modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const handleCloseDeleteForm = () => setShowDeleteModal(false);
    const handleShowDeleteForm = (id , name, desc) => {
         setShowDeleteModal(true);
         setCategoryId(id);
        setCategoryName(name);
        setCategoryDesc(desc);
    }
    const handleDeleteCategory = async (e) => {
        e.preventDefault()
        try {
            let role = user.role
            let deleteId = categoryId
            const body = {role}
            await axios.delete("/categories/" + deleteId, body);
            setReset(!reset)
          } catch (err) {
            console.log(err);
          }
        handleCloseDeleteForm()
    }
    // Update modal
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const handleCloseUpdateForm = () => setShowUpdateModal(false);
    const handleShowUpdateForm = (id , name, desc) => {
         setShowUpdateModal(true);
         setCategoryId(id);
        setCategoryName(name);
        setCategoryDesc(desc);
    }
    const handleUpdateCategory = async (e) => {
        e.preventDefault()
        try {
            const body = {
                name : categoryName, 
                desc: categoryDesc, }
                let updateId = categoryId
            await axios.put("/categories/" + updateId, body);
          } catch (err) {
            console.log(err);
          }
        handleCloseUpdateForm()
        setReset(!reset)
    }
    // Details modal
    const [showDetailModal, setShowDetailModal] = useState(false);
    const handleCloseDetailForm = () => setShowDetailModal(false);
    const handleShowDetailForm = (id , name, desc) => {
        setShowDetailModal(true);
        setCategoryId(id);
       setCategoryName(name);
       setCategoryDesc(desc);
    }

    const [categories, setCategories] = useState([])
    const [reset, setReset] = useState(false)
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get("/categories/allCategories", {})
                setCategories(res.data);
            }
            catch (err) {
                console.log(err)
            }
        };
        fetchCategories();
    }, [reset]);

    return (
        <div className="bottomRightSection">
                    <div className="tableContainer">

                            <div className="flexDirectionRow" >
                                <IoAddCircleSharp className="iconSize addIcon"></IoAddCircleSharp>
                                <Button className="addButtonContainer" onClick={handleShowAddForm}
                                onMouseOver = {({target}) => target.style.backgroundColor="#008080"}
                                onMouseOut = {({target}) => target.style.backgroundColor="#009999"}
                                >Add new category</Button>
                            </div>
                        <Table hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Category</th>
                                    <th>Description</th>
                                    <th>Delete</th>
                                    <th>Edit</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                            {categories.map((value, index) => {
                            return <tr>
                                <td>{value._id}</td>
                                <td>{value.name}</td>
                                <td>{value.desc}</td>
                                <td className="tableButtonContainer">
                                    <AiFillDelete className="deleteButton iconSize"
                                    onMouseOver = {({target}) => target.style.color="#b30000"}
                                    onMouseOut = {({target}) => target.style.color="red"} onClick={()=> handleShowDeleteForm(value._id, value.name, value.desc)}></AiFillDelete >
                                </td>
                                <td className="tableButtonContainer">
                                    <AiFillEdit className="editButton iconSize"
                                    onMouseOver = {({target}) => target.style.backgroundColor="#cccc00"}
                                    onMouseOut = {({target}) => target.style.backgroundColor="yellow"} onClick={()=> handleShowUpdateForm(value._id, value.name, value.desc)}></AiFillEdit>
                                </td>
                                <td className="tableButtonContainer">
                                    <BiDetail className="detailButton iconSize"
                                    onMouseOver = {({target}) => target.style.backgroundColor="#004080"}
                                    onMouseOut = {({target}) => target.style.backgroundColor="#0066cc"} onClick={()=> handleShowDetailForm(value._id, value.name, value.desc)}></BiDetail>
                                </td>
                            </tr>
                            })}
                            </tbody>
                        </Table>
                    </div>
                    {/* Add modal */}
                    <Modal className="myModal" show={showAddModal} onHide={handleCloseAddForm}>
                        <Modal.Header closeButton className="modalHeader">
                            <Modal.Title className="modalTitle">New category</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={handleAddCategory}>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">Category Name:</label>
                                    <input className="myCustomInput item2" ref={addName} placeholder="New category" required type="text"/>
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">Category Description:</label>
                                    <textarea className="myCustomTextArea item2" ref={addDesc} placeholder="Description here" required type="text"/>
                                </div>
                                <Button className="myCustomFooterButton" type="submit" variant="primary">
                                    Create
                                </Button>
                                <Button className="myCustomFooterButton" variant="secondary" onClick={handleCloseAddForm}>
                                    Cancel
                                </Button>
                            </form>
                        </Modal.Body>
                    </Modal>
                    {/* Delete modal */}
                    <Modal className="myModal" show={showDeleteModal} onHide={handleCloseDeleteForm}>
                        <Modal.Header closeButton className="modalHeader">
                            <Modal.Title className="modalTitle">Are you sure to delete this category?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={handleDeleteCategory}>
                            <div className="grid-container">
                                    <label className="myCustomlabel item1">Category ID:</label>
                                    <label className="myCustomlabel item2">{categoryId}</label>
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">Category Name:</label>
                                    <label className="myCustomlabel item2">{categoryName}</label>
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">Category Description:</label>
                                    <label className="myCustomlabel item2">{categoryDesc}</label>
                                </div>
                                <Button className="myCustomFooterButton" type="submit" variant="primary">
                                    Confirm Delete
                                </Button>
                                <Button className="myCustomFooterButton" variant="secondary" onClick={handleCloseDeleteForm}>
                                    Cancel
                                </Button>
                            </form>
                        </Modal.Body>
                    </Modal>
                    {/* Update modal */}
                    <Modal className="myModal" show={showUpdateModal} onHide={handleCloseUpdateForm}>
                        <Modal.Header closeButton className="modalHeader">
                            <Modal.Title className="modalTitle">Updating Category</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={handleUpdateCategory}>
                            <div className="grid-container">
                                    <label className="myCustomlabel item1">Category ID:</label>
                                    <label className="myCustomlabel item2">{categoryId}</label>
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">Category Name:</label>
                                    <input className="myCustomInput item2" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} required type="text"/>
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">Category Description:</label>
                                    <input className="myCustomInput item2" value={categoryDesc} onChange={(e) => setCategoryDesc(e.target.value)} required type="text"/>
                                </div>
                                <Button className="myCustomFooterButton" type="submit" variant="primary">
                                    Update
                                </Button>
                                <Button className="myCustomFooterButton" variant="secondary" onClick={handleCloseUpdateForm}>
                                    Cancel
                                </Button>
                            </form>
                        </Modal.Body>
                    </Modal>
                    {/* Details modal */}
                    <Modal className="myModal" show={showDetailModal} onHide={handleCloseDetailForm}>
                        <Modal.Header closeButton className="modalHeader">
                            <Modal.Title className="modalTitle">Category Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">Category ID:</label>
                                    <label className="myCustomlabel item2">{categoryId}</label>
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">Category Name:</label>
                                    <label className="myCustomlabel item2">{categoryName}</label>
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">Category Description:</label>
                                    <label className="myCustomlabel item2">{categoryDesc}</label>
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleCloseDetailForm}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>

                </div>
    )
}

export default CategoryCRUD;