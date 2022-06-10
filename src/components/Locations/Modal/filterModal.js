import React, {useState} from "react";
import { Modal, Button } from "react-bootstrap";

export default (props) => {
    let show = props.showFilter;
    let handleClose = props.handleFilterClose;
    let handleSubmit = props.handleSubmit;
    let clearFilter = props.clearFilter;
    
    const [filter, setFilter] = useState([]);

    const handleChange = (key, value) => {
        setFilter({...filter, [key]: value})
    }

    return(
        <>
            <Modal size="md" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Filter options</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div>
                    <div>
                        <label>Location Name </label> <span>:</span>
                        <input type="text" onChange={(e) => handleChange("locationName",e.target.value)} value={filter.locationName}/>
                    </div>
                    <div>
                        <label>Address </label> <span>:</span>
                        <input type="text" onChange={(e) => handleChange("address",e.target.value)} value={filter.address}/>
                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="success" onClick={() => clearFilter()}>
                    Clear Filter
                </Button>
                <Button variant="success" onClick={() => handleSubmit(filter)}>
                Filter
                </Button>
                <Button variant="danger" onClick={handleClose}>
                Close
                </Button>
            </Modal.Footer>
            </Modal>
        </>
    )
}