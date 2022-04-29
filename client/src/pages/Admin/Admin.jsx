import './admin.css'
import axios from "axios";
import { FaSearch, FaSignOutAlt } from 'react-icons/fa';
import { BsMenuButtonWide, BsPeopleFill } from "react-icons/bs";
import { GiEarthAmerica } from "react-icons/gi";
import { IoNotifications,IoAddCircleSharp} from "react-icons/io5";
import { AiFillDelete, AiFillEdit, AiFillCalendar } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router";
// to install: npm install react-bootstrap bootstrap@5.1.3
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import LeftSection from '../../Components/leftSection/LeftSection'
import TopNavigation from '../../Components/topNavigation/TopNavigation'
import CategoryCRUD from '../../Components/categoryCRUD/CategoryCRUD'
import StaffCRUD from '../../Components/staffCRUD/StaffCRUD'
import CloseDate from '../../Components/closeDate/CloseDate'

import { useParams } from "react-router-dom";

function Home () {
    const navigate = useNavigate();
    const handleNavigate = (route) => {
        navigate(route);
    }
    const { adminContentProp } = useParams();



    const showContent = (contentName) => {
        if(contentName=="category") {
            return (
                <CategoryCRUD></CategoryCRUD>
            )
        }
        if(contentName=="user") {
            return (
                <StaffCRUD></StaffCRUD>
            )
        }
        if(contentName=="closeDate") {
            return (
                <CloseDate></CloseDate>
            )
        }
    }


    return (
        <body className="screen">
            <LeftSection></LeftSection>
            <div className="rightSection">
                <div className="topRightSection">

                    <TopNavigation currentMode="Management Studio"></TopNavigation>

                    <div className="navigationTop">
                        <Button  className="navigationContent signOutButton takeRemainingSpace" onClick={() => handleNavigate("/admin/category")}>
                            <BiCategory className="iconSize paddingRight"></BiCategory>
                            <label className="paddingRight">Categories</label>
                        </Button>

                        <Button  className="navigationContent signOutButton takeRemainingSpace" onClick={() => handleNavigate("/admin/user")}>
                            <BsPeopleFill className="iconSize paddingRight"></BsPeopleFill>
                            <label className="paddingRight">Users</label>
                        </Button>
                        <Button  className="navigationContent signOutButton takeRemainingSpace" onClick={() => handleNavigate("/admin/closeDate")}>
                            <AiFillCalendar className="iconSize paddingRight"></AiFillCalendar>
                            <label className="paddingRight">Closing Date</label>
                        </Button>
                    </div>
                </div>
                {showContent(adminContentProp)}
            </div>
        </body>
    )
}
export default Home;