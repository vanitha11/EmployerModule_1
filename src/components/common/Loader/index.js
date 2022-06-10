import {loaderSelector} from "./selector";
import {useSelector} from "react-redux";

export default () => {
    const {isLoading} = useSelector(loaderSelector);
    return (
        <>
            {
                isLoading ? <div id="global-loader">
                    <img src="assets/images/loader.svg" className="loader-img" alt="Loader"/>
                </div> : null
            }
        </>
    )
}
