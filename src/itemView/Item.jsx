import axios from "axios"
import { useEffect } from "react"
import * as urls from "../infra/Urls"

const Item = () => {
    useEffect(
        () => {
            const fatchData = async () => {
                console.log(urls.ITEM_LIST_URL)
                try{
                const response = await axios.get(urls.ITEM_LIST_URL)
                console.log(response)
            } 
            catch (e){
                console.error(e)
                
            } }
            fatchData()
        }
        ,[]
    )
    return (
    <h1>this will be Item commponent</h1>
    )
}

export default Item