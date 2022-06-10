import React from "react";
import "./filter.css";
import { FiFilter } from "react-icons/fi"; 

export default ({filter, setFilter, showFilterModal}) => {
    return (
        <div id="myTable_filter">
            <label>
                Search:
                <input class="form-control searchInput" placeholder="Search for results..." 
                    value={filter || ''} 
                    onChange={e => setFilter(e.target.value)} />
                {/* <button
                id="bDel"
                type="button"
                class="btn  btn-sm btn-height"
                title="Delete"
                style={{ "font-size": "1.1rem" }}
                onClick={() => showFilterModal()}
              >
                <FiFilter /> 
              </button>*/}
            </label>
         </div>
    )

}