import React from 'react';
import Navbar from '@/components/shared/Navbar';
import HeroSection from '@/components/hero/heroSection';
import LatestJob from '@/components/jobs/LatestJob'
import Footer from '@/components/shared/Footer';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAppliedJobsApi } from '@/services/applicationApi';
import { setAppliedJobs } from '@/redux/slices/jobSlice';

const Home = () => {
    useGetAllJobs();
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const res = await getAppliedJobsApi();
                const jobIds = res.applications.map(
                    (app) => app.job._id || app.job
                );

                dispatch(setAppliedJobs(jobIds));
                //  dispatch(setAppliedJobs(res.data.applications));
                // console.log(jobIds);

            } catch (error) {
                console.log(error);
            }
        };

        fetchAppliedJobs();
    }, [dispatch]);
    if (user?.role === 'recruiter') {
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