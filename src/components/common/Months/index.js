import React from "react";

export default (props) => {
    const months = [
        'Present',
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    if (props.addPresent) {
        months.push('Present');
    }
    return (
        <div className="col-lg-2 col-md-2">
            <div className="form-group">
                <select name={props.name} className="form-control form-select" data-bs-placeholder="Select Country"
                        onChange={(event) => props.updateValue(event.target)} disabled={props.disabled}>
                    <option>Select</option>
                    {months.map((month, index) => {
                        return (
                            <option key={index} value={month} selected={props.value === month}>{month}</option>
                        )
                    })}
                </select>
                {props.errors && props.errors.map(error => (<div className="invalid-input">{error}</div>))}
            </div>
        </div>
    )
}
