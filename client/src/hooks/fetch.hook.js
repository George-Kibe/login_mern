//Make API requests
import axios from "axios"
import {useState, useEffect} from "react"
import { getUsername } from "../helpers/helper"

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN


const useFetch = (query) => {
    const [getData, setData] = useState({isLoading:false, apiData:null, status:null, serverError:false})

    useEffect(() => {
      //if(!query) return;
      const fetchData = async () => {
        try{
            setData(prev => ({...prev, isLoading:true}))
            const {username} = !query? await getUsername() : "";
            const {data, status} = !query? await axios.get(`api/user/${username}`) : await axios.get(`/api/${query}`)
            if(status===200){
                setData(prev => ({...prev, isLoading:false}))
                setData(prev => ({...prev, apiData:data, staus:status}))
            }
        }catch(error){
            setData(prev => ({...prev, isLoading:false, serverError:error}))
        }
      }
      fetchData()
    }, [query])

    return [getData, setData]

}

export default useFetch;