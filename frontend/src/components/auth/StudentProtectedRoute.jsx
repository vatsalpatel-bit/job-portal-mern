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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">

        <div className="flex flex-col items-center gap-4">

          <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />

          <p className="text-sm text-gray-500">
            Loading ...
          </p>

        </div>

      </div>
    );
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