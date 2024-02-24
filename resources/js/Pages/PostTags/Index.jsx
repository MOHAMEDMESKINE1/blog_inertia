import React, { useRef, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import { Link, useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import Swal from "sweetalert2";  

function Index({ auth,postTags  }) {

    const { data, setData, errors, post } = useForm({
        name: "",
       
    });
    const [editingPosTag, setEditingPosTag] = useState(null);
    const [form, setForm] = useState({ name: '' });

    const openEditModal = (postag) => {
        setEditingPosTag(postag);
        setForm({ name: postag.name }); // Assuming the tag has a 'name' property
       
      };
   
    // update tag
    // const updateTag = (e) => {
    //     e.preventDefault()
       
    //     Inertia.put(route('post_tag.update', { tag: editingPosTag.id }), form);
    //     setEditingPosTag(null);
    // }

    // add postTag
    // const handleSubmit = (e) => {
    //     e.preventDefault()

    //     post(route('post_tag.store'))
    // }
    // delete postTag
    // const deletePosTag = (id) => {

    //     Swal.fire({
    //         title: "Are you sure?",
    //         text: "You won't be able to revert this!",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Yes, delete it!"
    //       }).then((result) => {
    //         if (result.isConfirmed) {

    //             Inertia.delete(route('post_tag.destroy',id))
    //             Swal.fire({
    //                 title: "Deleted!",
    //                 text: "Your file has been deleted.",
    //                 icon: "success"
    //             });
    //         }
    //       });
    // }
   
    return (
        <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
    >
        <div className="py-12">
            
            <div className="mx-auto sm:px-6 lg:px-8">
                <div className="bg-white p-12 overflow-hidden shadow-sm sm:rounded-lg">
                    <h1 className=''>Posts</h1>
                    {/* modal */}
                        {/* <div className="flex justify-end w-full">
                        <button className="btn btn-outline btn-info  w-56 text-gray-900 w-75 p-1.5 rounded-sm shadow-sm my-3 "  onClick={()=>document.getElementById('createModal').showModal()}>Add Tag</button>
                            <dialog id="createModal" className="modal">
                                <div className="modal-box  w-full">
                                    <form method="dialog ">
                                    <p onClick={()=>document.getElementById('createModal').close()}    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</p>
                                    </form>
                                    <h3 className="font-bold text-lg mb-1">Add Tag</h3>
                                    <form onSubmit={handleSubmit}   encType='multipart/form-data'>
                                        
                                        <div className="mb-2">
                                        <input type="text" name='name' value={data.name}  onChange={(e)=> setData("name",e.target.value)}  placeholder="Type here" className="input input-bordered w-full mb-2" />
                                            <span className="text-red-500">
                                                {errors.name}
                                            </span>
                                        </div>
                                    
                                        <button type='submit' className='btn mt-2 w-50'>Save </button>
                                    </form>
                                </div>
                            </dialog>
                        </div> */}
                    {/*  Create modal */}

                    <div className="overflow-x-auto">
                        <table className="table  rounded  bg-gray-500  text-center shadow-sm" >
                            {/* head */}
                            <thead className='text-white'>
                            <tr>
                                <th>#</th>
                               
                                <th>NAME</th>
                                <th>CREATED_AT</th>
                               
                                <th>ACTION</th>
                            </tr>
                            </thead>
                            <tbody>
                            {/* row 1 */}
                             {
                                postTags.data.map(postTag =>(
                                    <tr  key={postTag.id} className="bg-base-100">
                                        <th>{postTag.id}</th>
                                   
                                        
                                        <th>
                                        {/* {
                                            postTag.posts.map(post =>(
                                                <th>{post.title}</th>
                                            ))
                                        } */}
                                        {postTag.title}
                                        </th>
                                        <th>{postTag.created_at}</th>
                                       
                                        <td>
                                            <div className="flex  justify-center mx-auto">
                                                <button  className='mx-2 p-1.5 rounded-sm text-white font-bold bg-green-500'
                                                 onClick={() => {
                                                     openEditModal(postTag)
                                                     document.getElementById('editModal').showModal()

                                                }  }>Edit</button>
                                                <button onClick={()=>deletePosTag(postTag.id)}   className='mx-2 p-1.5 rounded-sm text-white font-bold bg-red-500'>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                    
                                ))
                                
                             }
                            </tbody>
                        </table>
                        
                    </div>    
                    
                    {/* Edit Modal */}
                        {/* <dialog  id="editModal" className="modal">
                            <div className="modal-box  w-full">
                                <form method="dialog ">
                                <p onClick={()=>document.getElementById('editModal').close()}    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</p>
                                </form>
                                <h3 className="font-bold text-lg mb-1">Edit Tag</h3>
                                <form  >
                                    
                                    <div className="mb-2">
                                    <input type="text"
                                     name='name'
                                     required
                                     value= {form.name}   
                                     onChange={(e) => setForm({ ...form, name: e.target.value })}  placeholder="Type here" className="input input-bordered w-full mb-2" />
                                        <span className="text-red-500">
                                            {errors.name}
                                        </span>
                                    </div>
                                   
                                    <button onClick={updateTag} className='btn mt-2 w-50'>Save </button>
                                    <div  className='btn mt-2 w-50 mx-2' onClick={() => document.getElementById('editModal').close()}>Cancel</div>
                                </form>
                            </div>
                         </dialog> */}
                    {/* Edit Modal */}
                    <div className="flex justify-center my-5">
                            <Pagination links={postTags.links}/>
                            
                    </div>
                </div>
            </div>
        </div>

          
       
        </AuthenticatedLayout>
    );
}

export default Index;