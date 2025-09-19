import { Header } from "../Components/Header"

export function PageNotFound({ cart }){
    return(
        <>
        <Header cart={cart}/>
        <p>Error 404</p>
        <p> Page Not Found </p>
        </>
    );
}