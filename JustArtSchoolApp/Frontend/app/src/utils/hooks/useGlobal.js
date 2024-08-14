import {useContext} from "react";
import GlobalContext from "../context/Global";


const useGlobal = () => {
    return useContext(GlobalContext);
}

export default useGlobal;