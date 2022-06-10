import React, {useEffect} from "react";

export default (props) => {
    useEffect(() => {
        window.invokeDatePicker('datepicker-date', (value) => {
            props.updateValue({name: props.name, value: value});
        });
    }, []);
    return (
        <div className="col-lg-6 col-md-12">
            <label htmlFor={props.name}>{props.label}</label>
            <div className="input-group">
                <div className="input-group-text">
                    <label htmlFor={props.name}></label>
                    <i className="fa fa-calculator tx-16 lh-0 op-6"></i>
                </div>
                <input className="form-control" id="datepicker-date" placeholder={props.placeholder} type="text"
                       name={props.name} value={props.value}/>
            </div>
        </div>
    )
}
