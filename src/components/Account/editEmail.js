import React from "react";
import TextField from "../common/TextField/withLabel";
import Error from "../common/Message/error";
import Success from "../common/Message/success";

export default (props) => {
    return (
            <div className="row">
                {
                    props.errorMessage && <Error errorMessage={props.errorMessage}/>
                }
                {
                    props.message && <Success successMessage={props.message} />
                }
                <TextField divClass={"col-lg-12 col-md-12"} placeholder={"Email"} name={'email'} type={"email"}
                           iconClass={"zmdi zmdi-email"} label={"Email*"}
                           updateValue={props.updateValue} value={props.newEmail} errors={props.errors}/>
            </div>
    )
}
