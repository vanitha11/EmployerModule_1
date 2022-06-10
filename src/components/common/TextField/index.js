import React from "react";
import formatters from "./formatters";
import './input.css';

export default (props) => {
    const formatValue = (target) => {
        if (props.format) {
            target.value = formatters(target.value, props.format);
        }
        return target;
    };
    return (
        <>
            {
                props.label && <div className="wrap-input100 validate-input input-group">
                    <label htmlFor={props.name} className="logintextspace"><h5>{props.label}</h5></label>
                </div>
            }
            <div className="wrap-input100 validate-input input-group is-invalid"
                 data-bs-validate="Valid email is required: ex@abc.xyz">
                <a className={`input-group-text bg-white text-muted`}>
                    <i className={props.iconClass} aria-hidden="true" onClick={props.clickeye}></i>
                </a>
                <input
                    className={`input100 border-start-0 form-control ms-0 ${(props.errors && props.errors.length > 0) && 'has-errors'}`}
                    type={props.type} placeholder={props.placeholder} required={props.required}
                    autoFocus={props.autoFocus}
                    onChange={(event) => props.updateValue(formatValue(event.target))} name={props.name}/>
            </div>
            {props.errors && props.errors.map(error => (<div className="invalid-input">{error}</div>))}
        </>
    )
}
