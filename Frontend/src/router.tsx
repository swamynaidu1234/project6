import { useRoutes } from "raviger";
import Login from "./components/login";
import Cnt from "./components/Content";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
const obj={
    "/": ()=><Cnt />,
    "/login":()=><Login />,
    "/products":()=><Products />,
    "/product-details":()=><ProductDetails />
}

export default function RouterObj(){
    const rt=useRoutes(obj)
    return (
        <>
            {rt}
        </>
    )
}
