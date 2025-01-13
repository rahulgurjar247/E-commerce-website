
import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import "../index.css"

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('authToken')
        setIsAuthenticated(token);
    }, []);
    const navigate = useNavigate()

    const signOut = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
    }
    return (
        <nav className="bg-gray-800  text-white p-4 flex justify-between items-center">
            <div className="text-2xl font-bold ">
                <Link to="/" className="hover:text-blue-400">
                    MyEcommerce
                </Link>
            </div>

            {!isAuthenticated && <div className="space-x-4">
                <Link
                    to="/signin"
                    className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition duration-200"
                >
                    Sign In
                </Link>
                <Link
                    to="/signup"
                    className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition duration-200"
                >
                    Sign Up
                </Link>
            </div>}
            {
                isAuthenticated &&
                <>
                <button onClick={() => navigate("/add-item")}>Add item</button>
                <div className='px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition duration-200'
                    onClick={() => {signOut();}}
                >
                    signOut
                </div>
                </>
            }
        </nav>
    );
};

export default Navbar;
