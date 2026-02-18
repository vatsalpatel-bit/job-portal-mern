import React from 'react';
import Navbar from '@/components/shared/Navbar';
import HeroSection from '@/components/hero/heroSection';
import LatestJob from '@/components/jobs/LatestJob'
import Footer from '@/components/shared/Footer';
import userGetAllJobs from '@/hooks/useGetAllJobs';


const Home = () => {
    useGetAllJobs();
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