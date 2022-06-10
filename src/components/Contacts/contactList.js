import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {contactsSelector} from "./selector";
import {getContactList} from "./action";
import Table from "../common/Table";
import useConfiguration from "../../hooks/useConfiguration";

export default () => {
  const config = useConfiguration();
  const {contactList} = useSelector(contactsSelector);
  const [contactsList, setContactsList] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if(config.baseUrl)
    dispatch(getContactList(config.baseUrl));
  }, [config]);

  useEffect(() => {
    if(contactList.length > 0) {
      setContactsList(contactList);
    }
}, [contactList]); 

useEffect(() => {
  if(contactsList.length > 0) {
      setFilterList(contactsList);
  }
}, [contactsList.length > 0]);

  const locationName = [
    "Florida University Hospital",
    "Florida Northwest Hospital",
    "Florida Woodmont Hospital",
    "Florida Westside Hospital",
    "Florida Memorial Hospital"
  ]

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'firstName',
        width: 170
      },
      {
        Header: 'Employee ID',
        accessor: 'employeeId',
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
    <div class="panel-body tabs-menu-body">
      <div class="tab-content">
        <div class="tab-pane active" id="tab25">
          <div class="col-xl-14">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-lg-12 col-md-12">
                    <div class="form-group">
                      <label class="form-label">Location Name</label>
                      <select
                        name="Templates"
                        class="form-control form-select"
                        data-bs-placeholder="Select Template"
                      >
                        <option value="" selected>
                          -- Select --
                        </option>
                        {locationName.map(location => (
                          <option value="location">{location}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <Table id="contactTable" columns={columns} data={filterList} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
