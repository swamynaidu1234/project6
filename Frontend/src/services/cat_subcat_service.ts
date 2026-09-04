import serverConstant from "./serverConstant";
import axios from "axios";
export const getCat=async ()=>{
    return await axios.get(`http://${serverConstant.serverHost}:${serverConstant.port}/serGetCategory`)
}
export const getSubCat=async ()=>{
    return await axios.get(`http://${serverConstant.serverHost}:${serverConstant.port}/serGetSubCategory`)

}