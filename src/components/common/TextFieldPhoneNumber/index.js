import React from "react";
import './textinput.css';
import PhoneInput from 'react-number-format'
//mport 'react-phone-number-input/style.css';
//var NumberFormat = require('react-number-format');
export default (props) => {
    const divClass = props.divClass ? props.divClass : 'col-lg-6 col-md-12';
    return (
        <div className={divClass}>
            <div className="form-group">
                {!props.noLabel && <label htmlFor={props.name}>{props.label}</label>}
                <PhoneInput type="text" className="form-control" id={props.name} value={props.value}
                            placeholder={props.placeholder} name={props.name}
                            onChange={(event) => props.updateValue(event.target)}
                            autoFocus={props.autoFocus} format="###-###-####"
                />

                {/*<PhoneInput
       
        value=""
        prefix=""
        displayType="input"
        type="text"
        allowNegative={true}
        format="###-###-####" onValueChange={(event) => props.updateValue(event.target)} />
*/}
                {props.errors && props.errors.map(error => (<div className="invalid-input">{error}</div>))}
            </div>
        </div>
    )
}
