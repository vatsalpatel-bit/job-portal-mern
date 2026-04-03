import React from 'react';
import Navbar from '@/components/shared/Navbar';
import HeroSection from '@/components/hero/heroSection';
import LatestJob from '@/components/jobs/LatestJob'
import Footer from '@/components/shared/Footer';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


const Home = () => {
    useGetAllJobs();
    const {user}=useSelector((state)=>state.auth);
   if(user?.role==='recruiter'){
    return <Navigate to="/admin/companies" />;
   }
    return ((  
        <div>
            <Navbar />
            <HeroSection />
            <LatestJob />
            <Footer />
        </div>
    ))
}
export default Home;