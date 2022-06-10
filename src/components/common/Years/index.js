import React from "react";

export default (props) => {
    const year = new Date().getFullYear();
    const years = [];
    for (let i = year; i > year - 50; i--) {
        if (i === year) {
            years.push('Present');
        }
        years.push(i);
    }
    if (props.addPresent) {
        years.push('Present');
    }
    return (
        <div className="col-lg-2 col-md-2">
            <div className="form-group">
                <select name={props.name} className="form-control form-select"
                        onChange={(event) => props.updateValue(event.target)}>
                    <option>Select</option>
                    {years.map((year, index) => {
                        return (
                            <option key={index} value={year} selected={props.value === year}>{year}</option>
                        )
                    })}
                </select>
                {props.errors && props.errors.map(error => (<div className="invalid-input">{error}</div>))}
            </div>
        </div>
    )


}
