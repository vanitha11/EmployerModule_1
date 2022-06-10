import {useNavigate} from "react-router-dom";
import menus from './config.json';

export default (props) => {
    const navigate = useNavigate();
    const menuNavigate = (path) => {
        navigate(path);
    };
    return (
        <>
            <header className="App-header">
                {
                    console.log(menus)
                }
                <a href="#" onClick={() => menuNavigate('/dashboard')}>Dashboard</a>
                <a href="#" onClick={() => menuNavigate('/')}>Login</a>
            </header>
            <div>
                {props.children}
            </div>
        </>

    )
}
