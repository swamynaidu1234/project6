import { useRoutes,Link } from "raviger";

import Login from "./components/login";
import Cnt from "./components/Content";
const obj={
    "/": ()=><Cnt />,
    "/login":()=><Login />
}

export default function RouterObj(){
    const rt=useRoutes(obj)
    return (
        <>
            {rt}
        </>
    )
}
