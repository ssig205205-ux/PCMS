import AddHeader from "./assets/component/addCHeader";
import AddCForm from "./assets/component/addCForm"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function AddCusPage(){
    const nevigate = useNavigate();

    useEffect(() => {
        const handleEsc = (event) => {
          if (event.key === "Escape") {
                nevigate("/");
            // do something (close modal, reset state, etc.)
          }
        };
    
        window.addEventListener("keydown", handleEsc);
    
        return () => {
          window.removeEventListener("keydown", handleEsc);
        };
      },[]);


    return (
        <>
        <AddHeader />
        <AddCForm />
     
        </>
    )
}