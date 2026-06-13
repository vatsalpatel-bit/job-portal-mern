import { setUser } from '@/redux/slices/authslice';
import { getProfileApi } from '@/services/authApi';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const StudentProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const { user } = useSelector((state) => state.auth)
  useEffect(() => {
    const fetchProfileApi = async () => {
      try {
        const data = await getProfileApi();
        console.log(data.data.user)
        dispatch(setUser(data.data.user));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    }
    fetchProfileApi();
  }, [dispatch])

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "student") {
    return <Navigate to="/" />
  }

  return children;
};

export default StudentProtectedRoute;