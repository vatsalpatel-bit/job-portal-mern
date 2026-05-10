import { Link } from "react-router-dom";
import notFoundImage from "@/svg/404Page.jpg";

const NotFound = () => {
    return (

        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">

            {/* Image */}
            <img
                src={notFoundImage}
                alt="404"
                className="w-80 mb-8"
            />

            {/* Button */}
            <Link
                to="/"
                className="px-6 py-3 rounded-xl bg-black text-white hover:bg-gray-800 transition"
            >
                Back To Home
            </Link>

        </div>
    );
};

export default NotFound;