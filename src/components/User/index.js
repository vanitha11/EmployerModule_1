import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {usersSelector} from "./selector";
import {getUserList} from "./action";
import Footer from "../common/Footer";
import { Button, Col, Form, Row } from "react-bootstrap";
import './user.css';
import { useLocation, useNavigate } from "react-router-dom";
import useConfiguration from "../../hooks/useConfiguration";
import Table from "../common/Table";

export default () => {
    const config = useConfiguration();
    const navigate = useNavigate();
    const {userList} = useSelector(usersSelector);
    const [usersList, setUsersList] = useState([]);
    const [filterList, setFilterList] = useState([]);
    const dispatch = useDispatch();

  useEffect(() => {
    if (config.baseUrl)
        dispatch(getUserList(config.baseUrl));
  }, [config]);

  useEffect(() => {
    if(userList.length > 0) {
        setUsersList(userList);
    }
    }, [userList]); 

  useEffect(() => {
    if(usersList.length > 0) {
        setFilterList(usersList);
    }
    }, [usersList.length > 0]);

    const editUser = (row) => {
        navigate("/adduser", 
        {
            state: {
                editUser: true,
                name: row.locationName,
                userDetails : row,
            }
        })
    }

    const locationName = [
        "Florida University Hospital",
        "Florida NorthWest Hospital"
      ]
    
      const userType = [
        "Super Duper User",
        "Super User",
        "User"
      ]

      const columns = React.useMemo(
        () => [
          {
            Header: 'Name',
            accessor: 'firstName',
            width: 170
          },
          {
            Header: 'User Type',
            accessor: 'userType',
          },
          {
            Header: 'Location Name',
            accessor: 'locationName',
            width: 200,
          },
          {
            Header: 'Cell Phone #',
            accessor: 'cellPhoneNumber',
            width: 200,
          },
          {
            Header: 'Work Phone #',
            accessor: 'workNumber',
            width: 200,
          },
          {
            Header: 'Email Address',
            accessor: 'email',
            width: 200,
          },
        ],
        [],
      );
    
    return (
        <div className="page">
            <div className="page-main">
                <div className="main-content app-content mt-0 main-background">
                    <div className="side-app">
                        <div className="main-container container-fluid">
                            <div className="page-header headerMargin">

                                <h1 className="page-title">Users</h1>

                                <div>
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="javascript:void(0)">Dashboard</a></li>
                                        <li class="breadcrumb-item active" aria-current="page">Users</li>
                                    </ol>
                                </div>
                            </div>
                            <div className="row">
                                <div class="col-xl-12">
                                    <div class="card">
                                        <div class="col-lg-12 col-md-12">
                                            <div class="row">
                                                <div class="card-header cardheader">
                                                    <h4>Users Filter</h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-body" id="userForm">
                                            <Form autoComplete="off" noValidate>
                                                <Row>
                                                    <Form.Group as={Col} className="mb-2" controlId="userType">
                                                        <Form.Label>User Type</Form.Label>
                                                        <Form.Select>
                                                            <option value="">--Select--</option>
                                                            {userType.map((area, n) => (
                                                            <option key={`userType${n}`} value={area}>
                                                                {area}
                                                            </option>
                                                            ))}
                                                        </Form.Select>
                                                    </Form.Group>
                                                    <Form.Group as={Col} className="md-4" controlId="location">
                                                        <Form.Label>Location name</Form.Label>
                                                        <Form.Select>
                                                            <option value="">--Select--</option>
                                                            {locationName.map((area, n) => (
                                                            <option key={`traveldistance_${n}`} value={area}>
                                                                {area}
                                                            </option>
                                                            ))}
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Row>
                                                <Row>
                                                    <Form.Group  as={Col} className="mb-2" controlId="checkContact">
                                                        <Form.Label></Form.Label>
                                                        <Form.Check type="checkbox" label="Approval Users" />
                                                    </Form.Group>
                                                </Row>
                                                <div class="col-lg-12 col-md-3">
                                                    <div class="btn-toolbar sw-toolbar sw-toolbar-bottom justify-content-end" style={{ "max-width": '100%'}}>
                                                        <div class="btn-group me-2 sw-btn-group" role="group">
                                                            <button class="btn btn-primary sw-btn-next" type="button">Filter</button>
                                                        </div>
                                                        <div class="btn-group mr-2 sw-btn-group-extra" role="group">
                                                            <button class="btn btn-danger">Clear</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Form>
                                         </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="table-responsive">
                                                    <Table columns={columns} data={filterList} edit={editUser}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer/>
        </div>
    )
}