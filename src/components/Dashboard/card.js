import React from "react";
import {CircularProgressbarWithChildren, buildStyles} from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import './card.css';

export default (props) => {
    return (
        <div className="card">
            <div className="card-body">
                <div className="text-center">
                    <small className="text-muted">{props.smallTitle || 'My'}</small>
                    <h2 className="mb-2 mt-0">{props.title}</h2>
                    <div className={"circular-progress"}>
                        <CircularProgressbarWithChildren value={props.value} styles={buildStyles({
                            pathColor: `${props.pathColor}`,
                        })}>
                            {props.children}
                        </CircularProgressbarWithChildren>
                    </div>
                    <p className="mb-0 text-start">
                        <span className={`dot-label ${props.bgClass} me-2`}/>
                        {props.valueLabel}<span className="float-end">{props.value}{props.valueSuffix}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}
