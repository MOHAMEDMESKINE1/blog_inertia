import React from 'react';
import { usePage } from '@inertiajs/inertia-react';
import { Link } from '@inertiajs/react';
function Navbar({auth}) {

//    const {auth } =usePage().props;
    return (
        <div>
             <div tabIndex={0} className="menu bg-transparent  menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-full">
                        { 
                         auth && auth.user ? 
                            <Link
                                href={route('dashboard')}
                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400  focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Dashboard 
                            </Link>
                         : 
                        <>
                            <div className="flex justify-end mx-5">
                                <Link
                                    href={route('login')}
                                    className="font-semibold text-gray-950 hover:text-gray-900 dark:text-gray-400  focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                >
                                    Log in
                                </Link>

                                <Link
                                    href={route('register')}
                                    className="ms-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400  focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                >
                                    Register
                                </Link>
                            </div>
                        </>
                    }
                        </div>
        </div>
    );
}

export default Navbar;