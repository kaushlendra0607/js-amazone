import { Header } from "../Components/Header"

export function PageNotFound(){
    return(
        <>
        <>{Header()}</>
        <p>Error 404</p>
        <p> Page Not Found </p>
        </>
    );
}