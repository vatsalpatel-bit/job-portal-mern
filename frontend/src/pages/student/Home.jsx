import React from 'react';
import Navbar from '@/components/shared/Navbar';
import HeroSection from '@/components/student/home/heroSection';
import Footer from '@/components/shared/Footer';
import useGetAllJobs from '@/components/student/jobs/useGetAllJobs';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAppliedJobsApi } from '@/services/applicationApi';
import { setAppliedJobs } from '@/redux/slices/jobSlice';
import LatestJobs from '@/components/student/home/LatestJob';

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
            <LatestJobs />
            <Footer />
        </div>
    ))
}
export default Home;