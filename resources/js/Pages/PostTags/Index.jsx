import React, { useRef, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import {  useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import Swal from "sweetalert2";  

function Index({auth,postTags,posts,tags }) {

    const { data, setData, errors, post } = useForm({
        post_id:null,
        tag_id:null,
       
    });
    const [editingPosTag, setEditingPosTag] = useState(null);
    const [form, setForm] = useState({  
        post_id:null,
        tag_id:null,
     });

   
    const openEditModal = (postag) => {
       
        setEditingPosTag(postag);
        setForm({
            post_id:postag.post_id,
            tag_id:postag.tag_id
        }); 
       
      };

    

  // update tag
    const updatePostTag = (e) => {
        e.preventDefault()
        Inertia.put(route('post_tag.update',editingPosTag.id ,{
          onSuccess :()=> console.log('updated successfully')  
        }), form);
        setEditingPosTag(null);

    }

    //add postTag
    const handleSubmit = (e) => {
        e.preventDefault()

        post(route('post_tag.store'))
    }
    //delete postTag

    const deletePosTag = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {

                Inertia.delete(route('post_tag.destroy',id))
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
          });
        }
   

    return (
        <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
    >
        <div className="py-12">
            
            <div className="mx-auto sm:px-6 lg:px-8">
                <div className="bg-white p-12 overflow-hidden shadow-sm sm:rounded-lg">
                    <h1 className=''>Posts</h1>
                    {/*Create  modal */}
                        <div className="flex justify-end w-full">
                        <button className="btn btn-outline btn-info  w-56 text-gray-900 w-75 p-1.5 rounded-sm shadow-sm my-3 "  onClick={()=>document.getElementById('createModal').showModal()}>Add Tag</button>
                            <dialog id="createModal" className="modal">
                                <div className="modal-box  w-full">
                                    <form method="dialog ">
                                    <p onClick={()=>document.getElementById('createModal').close()}    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</p>
                                    </form>
                                    <h3 className="font-bold text-lg mb-1">Add Tag</h3>
                                    <form onSubmit={handleSubmit}   encType='multipart/form-data'>
                                        
                                        <div className="mb-2">
                                        <select name='post_id' onChange={(e)=> setData("post_id",e.target.value)} className="select select-primary w-full">
                                            <option disabled selected>Choose Post</option>
                                               
                                               {
                                                posts.map(post =>(
                                                   
                                                    <option value={post.id} >{post.title}</option>
                                                    
                                                 
                                                ))
                                               }
                                            </select>                                            
                                            <span className="text-red-500">
                                                {errors.title}
                                            </span>

                                        </div>
                                        <div className="mb-2">
                                        <select name='tag_id' onChange={(e)=> setData("tag_id",e.target.value)} className="select select-primary w-full">
                                            <option disabled selected>Choose Tag</option>
                                               
                                               {
                                                tags.map(tag =>(
                                                   
                                                    <option value={tag.id} >{tag.name}</option>
                                                   
                                                 
                                                ))
                                               }
                                            </select>                                            
                                            <span className="text-red-500">
                                                {errors.name}
                                            </span>

                                        </div>
                                    
                                        <button type='submit' className='btn mt-2 w-50'>Save </button>
                                    </form>
                                </div>
                            </dialog>
                        </div>
                    {/*  Create modal */}

                    <div className="overflow-x-auto text-center">
                        <table className="table  rounded   bg-gray-500  text-center shadow-sm" >
                            {/* head */}
                            <thead className='text-white'>
                            <tr>
                                <th>#</th>
                                <th>POST</th>
                                <th>TAG</th>
                                <th>CREATED_AT</th>
                                <th>UPDATED_AT</th>
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
                                        {
                                            postTag.posts.map(post =>(
                                                <th>{post.title}</th>
                                            ))
                                        }
                                        </th>
                                        <th>
                                         {
                                            postTag.tags.name
                                         }
                                        </th>
                                        <th>{postTag.created_at}</th>
                                        <th>{postTag.updated_at}</th>
                                       
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
                        <dialog  id="editModal" className="modal">
                            <div className="modal-box  w-full">
                            <form method="dialog ">
                                    <p onClick={()=>document.getElementById('editModal').close()}    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</p>
                                    </form>
                                    <h3 className="font-bold text-lg mb-1">Edit Post Tag</h3>
                                    <form>
                                        
                                        <div className="mb-2">
                                        <select name='post_id' value={form.post_id} onChange={(e) => setForm({ ...form, post_id: e.target.value })} className="select select-primary w-full">
                                            <option disabled selected>Choose Post</option>
                                               
                                               {
                                                posts.map(post =>(
                                                   
                                                    <option value={post.id} >{post.title}</option>
                                                    
                                                ))
                                               }
                                            </select>                                            
                                            {/* <span className="text-red-500">
                                                {errors.title}
                                            </span> */}

                                        </div>
                                        <div className="mb-2">
                                        <select name='tag_id' value={form.tag_id} onChange={(e) => setForm({ ...form,tag_id: e.target.value })} className="select select-primary w-full">
                                            <option disabled selected>Choose Tag</option>
                                               
                                               {
                                                tags.map(tag =>(
                                                   
                                                    <option value={tag.id} >{tag.name}</option>                                                 
                                                ))
                                               }
                                            </select>                                            
                                            {/* <span className="text-red-500">
                                                {errors.name}
                                            </span> */}

                                        </div>
                                    
                                        <button  onClick={updatePostTag} className='btn mt-2 w-50'>Save </button>
                                    </form>
                            </div>
                         </dialog>
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