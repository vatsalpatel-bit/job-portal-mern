import { setAllJobs } from '@/redux/slices/jobSlice'
import { JOB_API_END_PORT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllJobs = () => {
    const dispatch=useDispatch();
    useEffect(()=>{
        const fetchAllJobs=async ()=>{
            try {
                const res=await axios.get(`${JOB_API_END_PORT}/get`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setAllJobs(res.data.job));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllJobs();
    },[])
 
}

export default useGetAllJobs;
