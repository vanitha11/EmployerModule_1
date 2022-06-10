import React from "react";

export default (props) => {
    return (
        <>
            <div
                className="toast wrap-input100 align-items-center text-white bg-success border-0 show"
                role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false">
                <div className="d-flex">
                    <div className="toast-body">
                        {props.successMessage}
                    </div>
                </div>
            </div>
            <div>&nbsp;</div>
        </>
    )
}
