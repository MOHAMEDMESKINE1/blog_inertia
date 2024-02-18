import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import { Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

function Index({ auth,posts }) {
 
    const [image,setImage] = useState(null);
    const [values,setValues] = useState({
        title: "title",
        description: 'description',
        image: null,
    });

    const onImageChanged = () => {
            console.log(e.target.files[0]);
           setImage(e.target.files[0])
    }
    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault()

        Inertia.post(route('posts.store',values))
    }
    return (
        <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
    >
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white p-12 overflow-hidden shadow-sm sm:rounded-lg">
                    <h1 className=''>Posts</h1>
                    {/* modal */}
                        <div className="flex justify-end">
                        <button className="btn btn-outline text-gray-900 p-1.5 rounded-sm shadow-sm my-3 "  onClick={()=>document.getElementById('createModal').showModal()}>Create Poste</button>
                            <dialog id="createModal" className="modal">
                            <div className="modal-box">
                                <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>
                                <h3 className="font-bold text-lg mb-1">Create Poste</h3>
                                <form onSubmit={handleSubmit}   encType='multipart/form-data'>
                                    
                                    <input type="text" name='title' value={values.title}  onChange={handleChange}  placeholder="Type here" className="input input-bordered w-full mb-2" />

                                   
                                    <textarea name='description' value={values.description}  onChange={handleChange} className="textarea textarea-bordered w-full mb-2" placeholder="Bio"></textarea>
                                    
                                    
                                    <input type="file" value={values.image} onChange={onImageChanged} className="file-input file-input-bordered w-full mb-2 " />
                                    <button type='submit' className='btn mt-2 w-50'>Save </button>
                                </form>
                            </div>
                            </dialog>
                        </div>
                    {/* modal */}

                    <div className="overflow-x-auto">
                        <table className="table  rounded  bg-gray-500  text-center shadow-sm" >
                            {/* head */}
                            <thead className='text-white'>
                            <tr>
                                <th>#</th>
                                <th>IMAGE</th>
                                <th>TITLE</th>
                                <th>DESCRIPTION</th>
                                <th>ACTION</th>
                            </tr>
                            </thead>
                            <tbody>
                            {/* row 1 */}
                             {
                                posts.data.map(post =>(
                                    <tr className="bg-base-100">
                                        <th>{post.id}</th>
                                        <td>
                                            <img className='mask mask-squircle w-24' src={post.image} alt="" />
                                        </td>
                                        <td>{post.title}</td>
                                        <td>{post.description.slice(0,80)}...</td>
                                        <td>
                                            <div className="flex flex-row jsutify-between">
                                                <Link  href={route('posts.show',post.id)} className='mx-2'>Details</Link>
                                                <Link  href={route('posts.edit',post.id)} className='mx-2'>Edit</Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                             }
                            </tbody>
                        </table>
                    </div>    

                    <div className="flex justify-center my-5">
                            <Pagination links={posts.links}/>
                            
                    </div>
                </div>
            </div>
        </div>

          
       
        </AuthenticatedLayout>
    );
}

export default Index;