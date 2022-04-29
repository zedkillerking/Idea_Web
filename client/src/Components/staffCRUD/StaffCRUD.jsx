import './staffCRUD.css'
import axios from "axios";
import {IoAddCircleSharp} from "react-icons/io5";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { BiDetail } from "react-icons/bi";
import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
// to install: npm install react-bootstrap bootstrap@5.1.3
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

// to install: npm install react-datepicker --save
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function StaffCRUD () {
    const navigate = useNavigate();
    const handleNavigate = (route) => {
        navigate(route);
    }
    const DepA = ["Dep A", 10]
    const DepB = ["Dep B", 20]
    const departments = [DepA, DepB]
    //const [users, setUsers] = useState()
    const { user} = useContext(AuthContext);

    const [showAddModal, setShowModal] = useState(false);
    const handleCloseAddForm = () => setShowModal(false);
    const handleShowAddForm = () => setShowModal(true);

    const addUsername = useRef()
    const addEmail = useRef()
    const addPassword = useRef()
    const addPasswordAgain = useRef()
    const addRole = useRef()
    const addDepartment = useRef()
    const addPhone = useRef()
    const [isValidationError, setIsValidationError] = useState(false)

    const handleAddUser = async (e) => {
        e.preventDefault();
        setIsValidationError(false)
        if (addUsername.current.value.length > 50 || addUsername.current.value.length <3) 
        {
            addUsername.current.setCustomValidity("Userame must not be less than 3 or exceed 50 characters");
            setIsValidationError(true)
        }
        if (addEmail.current.value.length> 50) {
            addEmail.current.setCustomValidity("Email must not exceed 50 characters");
            setIsValidationError(true)
        }
        if(addPassword.current.value.length < 6) {
            addPassword.current.setCustomValidity("Password must have more than 6 characters")
            setIsValidationError(true)
        }
        if(addPasswordAgain.current.value.length < 6) {
            addPasswordAgain.current.setCustomValidity("Password must have more than 6 characters")
            setIsValidationError(true)
        }
        if(addPassword.current.value != addPasswordAgain.current.value) {
            addPasswordAgain.current.setCustomValidity("Password confirm failed, please make sure they are of the same value")
        }
        if(isValidationError == false) {
            const body = {
              username: addUsername.current.value,
              email: addEmail.current.value,
              password: addPassword.current.value,
              role: addRole.current.value,
              department: addDepartment.current.value,
              phone: addPhone.current.value,
            };
            try {
              await axios.post("/auth/register", body);
              setReset(!reset)
              handleCloseAddForm()
            } catch (err) {
              console.log(err);
            }
          }
    }

    const [userId, setUserId] = useState("")
    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [userRole, setUserRole] = useState("")
    const [userDepartment, setUserDepartment] = useState("")
    const [userPhone, setUserPhone] = useState("")

    // Delete modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const handleCloseDeleteForm = () => setShowDeleteModal(false);
    const handleShowDeleteForm = (id , name, email, role, dep, phone) => {
        setShowDeleteModal(true);
        setUserId(id);
        setUserName(name);
        setUserEmail(email)
        setUserRole(role);
        setUserDepartment(dep);
        setUserPhone(phone)
    }
    const handleDeleteUser = async (e) => {
        e.preventDefault()
        try {
            let role = user.role
            let deleteId = userId
            const body = {role}
            await axios.delete("/users/" + deleteId, body);
            setReset(!reset)
          } catch (err) {
            console.log(err);
          }
        handleCloseDeleteForm()
    }
    // Update modal
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const handleCloseUpdateForm = () => setShowUpdateModal(false);
    const handleShowUpdateForm = (id , name, email, role, dep, phone) => {
        setShowUpdateModal(true);
        setUserId(id);
        setUserName(name);
        setUserEmail(email)
        setUserPassword("")
        setUserRole(role);
        setUserDepartment(dep);
        setUserPhone(phone)
    }
    const handleUpdateUser = async (e) => {
        e.preventDefault()
        try {
            if(userPassword && userPassword.length > 5)
            {
                const body = {
                    username : userName, 
                    email: userEmail, 
                    password: userPassword, 
                    role: userRole, 
                    department: userDepartment, 
                    phone: userPhone, }
                    let updateId = userId
                await axios.put("/users/" + updateId, body);
            } else {
                const body = {
                    username : userName, 
                    email: userEmail, 
                    role: userRole, 
                    department: userDepartment, 
                    phone: userPhone, }
                    let updateId = userId
                await axios.put("/users/" + updateId, body);
            }
          } catch (err) {
            console.log(err);
          }
        handleCloseUpdateForm()
        setReset(!reset)
    }
    // Details modal
    const [showDetailModal, setShowDetailModal] = useState(false);
    const handleCloseDetailForm = () => setShowDetailModal(false);
    const handleShowDetailForm = (id , name, email, role, dep, phone) => {
        setShowDetailModal(true);
        setUserId(id);
        setUserName(name);
        setUserEmail(email)
        setUserRole(role);
        setUserDepartment(dep);
        setUserPhone(phone)
    }
    const [users, setUsers] = useState([])
    const [reset, setReset] = useState(false)
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get("/users/allUsers", {})
                setUsers(res.data);
            }
            catch (err) {
                console.log(err)
            }
        };
        fetchUsers();
    }, [reset]);


    return (
        <div className="bottomRightSection">
                    <div className="tableContainer">

                            <div className="flexDirectionRow" >
                                <IoAddCircleSharp className="iconSize addIcon"></IoAddCircleSharp>
                                <Button className="addButtonContainer" onClick={handleShowAddForm}
                                onMouseOver = {({target}) => target.style.backgroundColor="#008080"}
                                onMouseOut = {({target}) => target.style.backgroundColor="#009999"}
                                >Add new User</Button>
                            </div>
                        <Table hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Department</th>
                                    <th>Phone</th>
                                    <th>Delete</th>
                                    <th>Edit</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                            {users.map((value, index) => {
                            return <tr>
                                <td>{value._id}</td>
                                <td>{value.username}</td>
                                <td>{value.email}</td>
                                <td>{value.role}</td>
                                <td>{value.department}</td>
                                <td>{value.phone}</td>
                                <td className="tableButtonContainer">
                                    <AiFillDelete className="deleteButton iconSize"
                                    onMouseOver = {({target}) => target.style.color="#b30000"}
                                    onMouseOut = {({target}) => target.style.color="red"}
                                    onClick={() => handleShowDeleteForm(value._id, value.username, value.email, value.role, value.department, value.phone)}></AiFillDelete >
                                </td>
                                <td className="tableButtonContainer">
                                    <AiFillEdit className="editButton iconSize"
                                    onMouseOver = {({target}) => target.style.backgroundColor="#cccc00"}
                                    onMouseOut = {({target}) => target.style.backgroundColor="yellow"}
                                    onClick={() => handleShowUpdateForm(value._id, value.username, value.email, value.role, value.department, value.phone)}></AiFillEdit>
                                </td>
                                <td className="tableButtonContainer">
                                    <BiDetail className="detailButton iconSize"
                                    onMouseOver = {({target}) => target.style.backgroundColor="#004080"}
                                    onMouseOut = {({target}) => target.style.backgroundColor="#0066cc"}
                                    onClick={() => handleShowDetailForm(value._id, value.username, value.email, value.role, value.department, value.phone)}></BiDetail>
                                </td>
                            </tr>
                            })}
                            </tbody>
                        </Table>
                    </div>
                    
                    {/* Add modal */}
                    <Modal className="myModal" show={showAddModal} onHide={handleCloseAddForm}>
                        <Modal.Header closeButton  className="modalHeader">
                            <Modal.Title  className="modalTitle">New User</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={handleAddUser}>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">Name:</label>
                                    <input className="myCustomInput item2" ref={addUsername} placeholder="Name here" required type="text"/>
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">Email:</label>
                                    <input className="myCustomInput item2" ref={addEmail} placeholder="Email here" required type="email"/>
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">Password:</label>
                                    <input className="myCustomInput item2" ref={addPassword} placeholder="" required type="password" minLength="6"/>
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1"> Confirm Password:</label>
                                    <input className="myCustomInput item2" ref={addPasswordAgain} placeholder="" required type="password" minLength="6"/>
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">Role:</label>
                                    <select ref={addRole}>
                                        <option value="staff">Staff</option>
                                        <option value="coordinator">Coordinator</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">Department:</label>
                                    <select ref={addDepartment}>
                                        <option value="dept a">Dept A</option>
                                        <option value="dept b">Dept B</option>
                                        <option value="dept c">Dept C</option>
                                    </select>
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">Phone:</label>
                                    <input className="myCustomInput item2" ref={addPhone} placeholder="Phone number here" required type="tel"/>
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
                            <Modal.Title className="modalTitle">Are you sure to delete this User?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={handleDeleteUser}>
                            <div className="grid-container">
                                    <label className="myCustomlabel item1">User ID:</label>
                                    <label className="myCustomlabel item2">{userId}</label>
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">User Name:</label>
                                    <label className="myCustomlabel item2">{userName}</label>
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">User Email:</label>
                                    <label className="myCustomlabel item2">{userEmail}</label>
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">User Role:</label>
                                    <label className="myCustomlabel item2">{userRole}</label>
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">User Department:</label>
                                    <label className="myCustomlabel item2">{userDepartment}</label>
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">User Phone:</label>
                                    <label className="myCustomlabel item2">{userPhone}</label>
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
                            <Modal.Title className="modalTitle">Updating User</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={handleUpdateUser}>
                            <div className="grid-container">
                                    <label className="myCustomlabel item1">User ID:</label>
                                    <label className="myCustomlabel item2">{userId}</label>
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">User Name:</label>
                                    <input className="myCustomInput item2" value={userName} onChange={(e) => setUserName(e.target.value)} required type="text"/>
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">User Email:</label>
                                    <input className="myCustomInput item2" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} required type="email"/>
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">New Password:</label>
                                    <input className="myCustomInput item2" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} placeholder="" type="password" minLength="6"/>
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">User Role:</label>
                                    <select value={userRole} onChange={(e) => setUserRole(e.target.value)}>
                                        <option value="staff">Staff</option>
                                        <option value="coordinator">Coordinator</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">User Department:</label>
                                    <select value={userDepartment} onChange={(e) => setUserDepartment(e.target.value)}>
                                        <option value="dept a">Dept A</option>
                                        <option value="dept b">Dept B</option>
                                        <option value="dept c">Dept C</option>
                                    </select>
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">User Phone:</label>
                                    <input className="myCustomInput item2" value={userPhone} onChange={(e) => setUserPhone(e.target.value)} type="tel"/>
                                </div>
                                <Button className="myCustomFooterButton" type="submit" variant="primary">
                                    Confirm Update
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
                            <Modal.Title className="modalTitle">User Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <form>
                            <div className="grid-container">
                                    <label className="myCustomlabel item1">User ID:</label>
                                    <label className="myCustomlabel item2">{userId}</label>
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">User Name:</label>
                                    <label className="myCustomlabel item2">{userName}</label>
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">User Email:</label>
                                    <label className="myCustomlabel item2">{userEmail}</label>
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">User Role:</label>
                                    <label className="myCustomlabel item2">{userRole}</label>
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">User Department:</label>
                                    <label className="myCustomlabel item2">{userDepartment}</label>
                                </div>
                                <div className="grid-container">
                                    <label className="myCustomlabel item1">User Phone:</label>
                                    <label className="myCustomlabel item2">{userPhone}</label>
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
export default StaffCRUD;