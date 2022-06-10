import React from "react";
import './input.css';
import formatters from "./formatters";

export default (props) => {
    const formatValue = (target) => {
        if (props.format) {
            target.value = formatters(target.value, props.format);
        }
        return target;
    };
    const divClass = props.divClass ? props.divClass : 'col-lg-6 col-md-12';
    return (
        <div className={divClass}>
            <div className="form-group">
                {!props.noLabel && <label htmlFor={props.name}>{props.label}</label>}
                <input type="text" className="form-control" id={props.name} value={props.value}
                       placeholder={props.placeholder} name={props.name}
                       onChange={(event) => props.updateValue(formatValue(event.target))}
                       autoFocus={props.autoFocus}/>
                {props.errors && props.errors.map(error => (<div className="invalid-input">{error}</div>))}
            </div>
        </div>
    )
}
