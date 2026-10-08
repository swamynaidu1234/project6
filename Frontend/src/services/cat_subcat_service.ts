import serverConstant from "./serverConstant";
import axios from "axios";

export const getCat = async () => {
    return await axios.get(`http://${serverConstant.serverHost}:${serverConstant.port}/serGetCategory`)
}
export const getSubCat = async () => {
    return await axios.get(`http://${serverConstant.serverHost}:${serverConstant.port}/serGetSubCategory`)

}
export const getProductsBySubCatId = async (subCatId: string) => {
    return await axios.get(`http://${serverConstant.serverHost}:${serverConstant.port}/serGetProductsBySubCatId`, {
        params: { subcatid: subCatId },
    })
}

export const getProductsByType = async (type: string) => {
    return await axios.get(
        `http://${serverConstant.serverHost}:${serverConstant.port}/serGetProductsByType`,
        {
            params: { type: type }
        })
}