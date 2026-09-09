import { useRoutes,Link } from "raviger";
import Login from "./components/login";
import Cnt from "./components/Content";
import Products from "./components/Products";
const obj={
    "/": ()=><Cnt />,
    "/login":()=><Login />,
    "/products":()=><Products />
}

export default function RouterObj(){
    const rt=useRoutes(obj)
    return (
        <>
            {rt}
        </>
    )
}
