import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import Footer from "../common/Footer";
import {getLocationList, getFilteredList} from "./action";
import {getFilterListError} from "./slice";
import {locationsSelector} from "./selector";
import Modal from './Modal/viewModal';
import DeleteModal from './Modal/deleteModal';
import FilterModal from "./Modal/filterModal";
import Table from "../common/Table";
import useConfiguration from "../../hooks/useConfiguration";
import './location.css';

export default () => {
    const navigate = useNavigate();
    const config = useConfiguration();
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const dispatch = useDispatch();
    const {locationList} = useSelector(locationsSelector);
    const {filteredList}= useSelector(locationsSelector);
    const {errorMessage} = useSelector(locationsSelector);
    const [list, setLocationList] =  useState([]);
    const [contactList, setContactList] = useState([]);
    const [filterList, setFilterList] = useState([]);
    const showSearch = true;

    useEffect(() => {
        if(locationList.length > 0) {
            setLocationList(locationList);
        }
    }, [locationList]); 

    useEffect(() => {
        if(list.length > 0) {
            setFilterList(list);
        }
    }, [list.length > 0]);

    useEffect(() => {
        if(filteredList.length > 0) {
            setFilterList(filteredList);
        }
    }, [filteredList])


      const columns = React.useMemo(
        () => [
          {
            Header: 'Location Name',
            accessor: 'locationName',
            width: 170
          },
          {
            Header: 'Address',
            accessor: 'city',
            width: 170
          },
          {
            Header: 'Phone',
            accessor: 'phoneNumber',
          },
          {
            Header: 'Travel distance',
            accessor: 'acceptableTravelDistance',
            width: 200,
          },
        ],
        [],
      );


    useEffect(() => {
        if (config.baseUrl)
            dispatch(getLocationList(config.baseUrl));
      }, [config]);

    const showModal = (row) => {

        if(row.contacts) {
            const contacts = row.contacts;
            setContactList(prev => ([...prev, ...contacts]));
            navigate("/addlocations", {
                state: {
                    contacts: "true",
                    contactList: row.contacts,
                    name: row.locationName,
                    locationDetails : row,
                }
            });
        }
        
    }

    const editLocation = (row) => {
        const detail = row;
        navigate("/addlocations", {
            state: {
                contacts: "false",
                name: row.locationName,
                locationDetails : row,
                contactList: row.contacts,
            }
        });
    }

      
    const handleClose = () => setShow(false);

    const showDeleteModal = (row) => {
        setShowDelete(true);
    }

    const handleDeleteClose = () => setShowDelete(false);

    const showFilterModal = () => {
        setShowFilter(true);
    }

    const handleFilterClose = () => setShowFilter(false);

    const handleSubmit = (data) => {
        setShowFilter(false);
        dispatch(getFilterListError(" "));
        dispatch(getFilteredList(data, list));
    }

    const clearFilter = () => {
        setShowFilter(false);
        setFilterList(list);
    }

    const addNewLocation = () => {
        navigate("/addlocations", 
        {
            state: {
                contacts: "false",
                hideContact: true
            }
        })
    }

    return(
        <div className="page">
            <div className="page-main">
                <div className="main-content app-content mt-0 main-background">
                    <div className="side-app">
                        <div className="main-container container-fluid">
                            <div className="page-header">
                                <h1 className="page-title">Locations</h1>
                                <div>
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="javascript:void(0)">Dashboard</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">Locations</li>
                                </ol>
                            </div>
                            </div>
                            <div className="row">
                                <div class="col-xl-12">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="table-responsive">
                                                <div id="myTable_wrapper" class="dataTables_wrapper no-footer">
                                                    <div class="newLocation">
                                                        <button class="btn btn-success" onClick={addNewLocation}>Add New Location</button>
                                                    </div>
                                                    <div class="errorMsg">{errorMessage}</div>
                                                    <Table columns={columns} data={filterList} showSearch={showSearch} showModal={showModal} showDeleteModal={showDeleteModal} showFilterModal={showFilterModal} edit={editLocation} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        {/* Edit Modal Component */}
                        <Modal show={show} handleClose={handleClose} contactList={contactList}/>
                           
                        {/* Delete Modal Component */}
                        <DeleteModal showDelete={showDelete} handleDeleteClose={handleDeleteClose} />

                        {/* Filter Modal Component */}
                        <FilterModal showFilter={showFilter} handleFilterClose={handleFilterClose} handleSubmit={handleSubmit} clearFilter={clearFilter} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
