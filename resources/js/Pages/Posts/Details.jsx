import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';

function Details({auth,post }) {
   
    return (
        <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
    >
        <div className="py-12">
            <div className="  lg:px-8">
                <div className="bg-white p-12 overflow-hidden shadow-sm sm:rounded-lg">
                    <h1>Details/ <Link href={route('posts.index')}  className='hover:bg-gray-600 hover:p-1.5 rounded-md'><strong>Go back</strong></Link> </h1>
                    <div className="hero min-h-screen bg-base-200 mt-5 rounded-md shadow-md">
                                <div className="hero-content flex-col lg:flex-row">
                                    <img src={"/storage/posts/"+post.image} alt={post.title}  className="max-w-sm rounded-lg shadow-2xl" />
                                    <div>
                                    <h1 className="text-5xl font-bold">{post.title}</h1>
                                   <div className="mt-12">
                                   <p className="">
                                        {post.description}    
                                    </p>
                                    <p className='text-gray-500 '>{post.created_at}</p>
                                   </div>


                                    </div>
                                </div>
                        </div>

                </div>
            </div>
        </div>

          
       
        </AuthenticatedLayout>
    );
}

export default Details;