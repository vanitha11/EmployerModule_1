import React from "react";

export default (props) => {

    return (
        <>
            <label className="custom-control custom-checkbox mt-4">
                <input type="checkbox" className="custom-control-input" name={props.name}
                       value={props.value} checked={props.checked}
                       onChange={(event => props.updateValue({name: props.name, value: event.target.checked}))}/>
                <span className="custom-control-label">
                    {props.children}
                </span>
            </label>
            {props.errors && props.errors.map(error => (<div className="invalid-input">{error}</div>))}
        </>
    )
}
