import './closeDate.css'
import axios from "axios";
import { IoAddCircleSharp} from "react-icons/io5";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { BiDetail } from "react-icons/bi";
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router";
// to install: npm install react-bootstrap bootstrap@5.1.3
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
// to install: npm install react-datepicker --save
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../../context/AuthContext";
function CloseDate () {
    const { user} = useContext(AuthContext);

    const [closeDateId, setCloseDateId] = useState("");
    const [year, setYear] = useState("")
    
    const [ addOpenDate, setAddOpenDate] = useState(new Date())
    const [ addCommentCloseDate, setAddCommentCloseDate] = useState(new Date())
    const [ addPostCloseDate, setAddPostCloseDate] = useState(new Date())

    const [openDate, setOpenDate] = useState(new Date());
    const [commentCloseDate, setCommentCloseDate] = useState(new Date());
    const [postCloseDate, setPostCloseDate] = useState(new Date());

    const [newOpenDate, setNewOpenDate] = useState(new Date());
    const [newCommentCloseDate, setNewCommentCloseDate] = useState(new Date());
    const [newPostCloseDate, setNewPostCloseDate] = useState(new Date());
    // Add modal
    const [showAddModal, setShowAddModal] = useState(false);
    const handleCloseAddForm = () => setShowAddModal(false);
    const handleShowAddForm = () => setShowAddModal(true);
    const handleAddCloseDate = async (e) => {
        e.preventDefault();
        const body = {
            year: year,
            openDate: addOpenDate,
            commentCloseDate: addCommentCloseDate,
            postCloseDate: addPostCloseDate,
        };
        try {
            await axios.post("/closeDates/add", body);
            setReset(!reset)
            handleCloseAddForm()
        } catch (err) {
            console.log(err);
        }
    }
    // Delete modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const handleCloseDeleteForm = () => setShowDeleteModal(false);
    const handleShowDeleteForm = ( id, year, open , commentClose, postClose) => {
        setShowDeleteModal(true);
        
        setCloseDateId(id)
        setYear(year)
        setOpenDate(open);
        setCommentCloseDate(commentClose);
        setPostCloseDate(postClose);
    }
    const handleDeleteCloseDate = async (e) => {
        e.preventDefault()
        try {
            let role = user.role
            let deleteId = closeDateId
            const body = {role}
            await axios.delete("/closeDates/" + deleteId, body);
            setReset(!reset)
          } catch (err) {
            console.log(err);
          }
        handleCloseDeleteForm()
    }
    // Update modal
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const handleCloseUpdateForm = () => setShowUpdateModal(false);
    const handleShowUpdateForm = (id, year, open , commentClose, postClose) => {
        setShowUpdateModal(true);
        
        setCloseDateId(id)
        setYear(year)
        setOpenDate(open);
        setCommentCloseDate(commentClose);
        setPostCloseDate(postClose);
    }
    const handleUpdateCloseDate = async (e) => {
        e.preventDefault()
        try {
            const body = {
                year : year, 
                openDate: newOpenDate,
                commentCloseDate : newCommentCloseDate,
                postCloseDate: newPostCloseDate}
            let updateId = closeDateId
            await axios.put("/closeDates/" + updateId, body);
          } catch (err) {
            console.log(err);
          }
        handleCloseUpdateForm()
        setReset(!reset)
    }
    // Details modal
    const [showDetailModal, setShowDetailModal] = useState(false);
    const handleCloseDetailForm = () => setShowDetailModal(false);
    const handleShowDetailForm = (id, year, open , commentClose, postClose) => {
        setShowDetailModal(true);

        setCloseDateId(id)
        setYear(year)
        setOpenDate(open);
        setCommentCloseDate(commentClose);
        setPostCloseDate(postClose);
   }

   const [closeDates, setCloseDates] = useState([])
   const [reset, setReset] = useState(false)
   useEffect(() => {
    const fetchCloseDates = async () => {
        try {
            const res = await axios.get("/closeDates/allCloseDates", {})
            setCloseDates(res.data);
        }
        catch (err) {
            console.log(err)
        }
    };
    fetchCloseDates();
}, [reset]);

    return (
        <div className="bottomRightSection">
                    <div className="tableContainer">

                            <div className="flexDirectionRow" >
                                <IoAddCircleSharp className="iconSize addIcon"></IoAddCircleSharp>
                                <Button className="addButtonContainer" onClick={handleShowAddForm}
                                onMouseOver = {({target}) => target.style.backgroundColor="#008080"}
                                onMouseOut = {({target}) => target.style.backgroundColor="#009999"}
                                >Add new Closing Date</Button>
                            </div>
                        <Table hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Year</th>
                                    <th>Open Post Date</th>
                                    <th>Close Comment Date</th>
                                    <th>Close Post Date</th>
                                    <th>Delete</th>
                                    <th>Edit</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                            {closeDates.map((value, index) => {
                            return <tr>
                                <td>{value._id}</td>
                                <td>{value.year}</td>
                                <td>{value.openDate}</td>
                                <td>{value.commentCloseDate}</td>
                                <td>{value.postCloseDate}</td>
                                <td className="tableButtonContainer">
                                    <AiFillDelete className="deleteButton iconSize"
                                    onMouseOver = {({target}) => target.style.color="#b30000"}
                                    onMouseOut = {({target}) => target.style.color="red"} onClick={()=> handleShowDeleteForm(value._id, value.year, value.openDate, value.commentCloseDate, value.postCloseDate)}></AiFillDelete >
                                </td>
                                <td className="tableButtonContainer">
                                    <AiFillEdit className="editButton iconSize"
                                    onMouseOver = {({target}) => target.style.backgroundColor="#cccc00"}
                                    onMouseOut = {({target}) => target.style.backgroundColor="yellow"} onClick={()=> handleShowUpdateForm(value._id, value.year, value.openDate, value.commentCloseDate, value.postCloseDate)}></AiFillEdit>
                                </td>
                                <td className="tableButtonContainer">
                                    <BiDetail className="detailButton iconSize"
                                    onMouseOver = {({target}) => target.style.backgroundColor="#004080"}
                                    onMouseOut = {({target}) => target.style.backgroundColor="#0066cc"} onClick={()=> handleShowDetailForm(value._id, value.year, value.openDate, value.commentCloseDate, value.postCloseDate)}></BiDetail>
                                </td>
                            </tr>
                            })}
                            </tbody>
                        </Table>
                    </div>
                    {/* Add modal */}
                    <Modal className="myModal" show={showAddModal} onHide={handleCloseAddForm}>
                        <Modal.Header closeButton  className="modalHeader">
                            <Modal.Title  className="modalTitle">New Closing Date</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={handleAddCloseDate}>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">Year:</label>
                                    <input className="myCustomInput item2" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Year" required type="text"/>
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">Open Date:</label>
                                    <DatePicker required showYearDropdown scrollableYearDropdown showTimeSelect dateFormat="Pp" selected={addOpenDate} onChange={(date) => setAddOpenDate(date)} />
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">Comment Close Date:</label>
                                    <DatePicker required showYearDropdown scrollableYearDropdown showTimeSelect dateFormat="Pp" selected={addCommentCloseDate} onChange={(date) => setAddCommentCloseDate(date)} />
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">Post Close Date:</label>
                                    <DatePicker required showYearDropdown scrollableYearDropdown showTimeSelect dateFormat="Pp" selected={addPostCloseDate} onChange={(date) => setAddPostCloseDate(date)} />
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
                            <form onSubmit={handleDeleteCloseDate}>
                            <div className="grid-container">
                                    <label className="myCustomlabel item1">Close Date ID:</label>
                                    <label className="myCustomlabel item2">{closeDateId}</label>
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">Year:</label>
                                    <label className="myCustomlabel item2">{year}</label>
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">Post Open Date:</label>
                                    <label className="myCustomlabel item2">{openDate}</label>
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">Comment Close Date:</label>
                                    <label className="myCustomlabel item2">{commentCloseDate}</label>
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">Post Close Date:</label>
                                    <label className="myCustomlabel item2">{postCloseDate}</label>
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
                            <form onSubmit={handleUpdateCloseDate}>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">Close Date ID:</label>
                                    <label className="myCustomlabel item2">{closeDateId}</label>
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">Year:</label>
                                    <input className="myCustomInput item2" value={year} onChange={(e) => setYear(e.target.value)} required type="text"/>
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">Post Open Date:</label>
                                    <DatePicker showYearDropdown scrollableYearDropdown showTimeSelect dateFormat="Pp" selected={newOpenDate} onChange={(date) => setNewOpenDate(date)} />
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">Comment Close Date:</label>
                                    <DatePicker showYearDropdown scrollableYearDropdown showTimeSelect dateFormat="Pp" selected={newCommentCloseDate} onChange={(date) => setNewCommentCloseDate(date)} />
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">Post Close Date:</label>
                                    <DatePicker showYearDropdown scrollableYearDropdown showTimeSelect dateFormat="Pp" selected={newPostCloseDate} onChange={(date) => setNewPostCloseDate(date)} />
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
                    {/* Detail modal */}
                    <Modal className="myModal" show={showDetailModal} onHide={handleCloseDetailForm}>
                        <Modal.Header closeButton className="modalHeader">
                            <Modal.Title className="modalTitle">Category Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">Close Date ID:</label>
                                    <label className="myCustomlabel item2">{closeDateId}</label>
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">Year:</label>
                                    <label className="myCustomlabel item2">{year}</label>
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">Open Date:</label>
                                    <label className="myCustomlabel item2">{openDate}</label>
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">Comment Close Date:</label>
                                    <label className="myCustomlabel item2">{commentCloseDate}</label>
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">Post Close Date:</label>
                                    <label className="myCustomlabel item2">{postCloseDate}</label>
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
export default CloseDate;