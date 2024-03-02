import React, { useRef, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import {  useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import Swal from "sweetalert2";  
import Search from '@/Components/blog/Search.jsx'

function Index({auth,posts,comments}) {
    const { data, setData, errors, post } = useForm({
        content: "",
        post: null,
       
       
    });
    const [editingComment, setEditingComment] = useState(null);
    const [form, setForm] = useState({ name: '' });

    const openEditModal = (comment) => {
        setEditingComment(comment);
        setForm({ 
            content: comment.content,
            post: comment.post,
         }); 
       
      };
   
    // update tag
    const updateComment = (e) => {
        e.preventDefault()
       
        Inertia.put(route('comments.update', { comment: editingComment.id }), form);
        setEditingComment(null);
    }

    // add category
    const handleSubmit = (e) => {
        e.preventDefault()

        post(route('comments.store'))
    }

    // delete category
    const deleteComment = (id) => {

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

                Inertia.delete(route('comments.destroy',id))
                
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
                 
                    <h1 className=''>Comments</h1>
                     {/* Create modal */}
                     <div className="flex justify-end w-full">
                      <button className="btn btn-outline btn-info  w-56 text-gray-900 w-75 p-1.5 rounded-sm shadow-sm my-3 "  onClick={()=>document.getElementById('createModal').showModal()}>Add Comment</button>
                          <dialog id="createModal" className="modal">
                              <div className="modal-box  w-full">
                                  <form method="dialog ">
                                  <p onClick={()=>document.getElementById('createModal').close()}    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</p>
                                  </form>
                                  <h3 className="font-bold text-lg mb-1">Add Comment</h3>
                                  <form onSubmit={handleSubmit}   encType='multipart/form-data'>
                                      
                                      <div className="mb-2">
                                        <input type="text" name='content' value={data.content}  onChange={(e)=> setData("content",e.target.value)}  placeholder="Type here" className="input input-bordered w-full mb-2" />
                                          <span className="text-red-500">
                                              {errors.content}
                                          </span>
                                      </div>
                                      <div className="mb-2">
                                        <select name='post' onChange={(e)=> setData("post",e.target.value)}   className="select select-bordered w-full ">
                                            <option disabled selected>Post</option>
                                             {
                                                posts.map(post =>(
                                                    <option key={post.id} value={post.id}>{post.title}</option>
                                                ))
                                             }
                                        </select>

                                          <span className="text-red-500">
                                              {errors.post}
                                          </span>
                                      </div>
                                  
                                      <button type='submit' className='btn mt-2 w-50'>Save </button>
                                  </form>
                              </div>
                          </dialog>
                      </div>
                    {/*  Create modal */}


                    <Search url={'comments.index'}/>

                    <table className="table  rounded  bg-gray-500  text-center shadow-sm" >
                        {/* head */}
                        <thead className='text-white'>
                        <tr>
                            <th>#</th>
                            <th>POST</th>
                            <th>CONTENT</th>
                            <th>POSTED BY</th>
                            <th>CREATED_AT</th>
                            
                            <th>ACTION</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/* row 1 */}
                            {
                            comments.data.map(comment =>(
                                <tr  key={comment.id} className="bg-base-100">
                                    <th>{comment.id}</th>
                                    <th>{comment.post.title}</th>
                                    <th>{comment.content}</th>
                                    <th>{comment.user.name}</th>
                                    <th>{comment.created_at}</th>
                                
                                    
                                    
                                    
                                    <td>
                                        <div className="flex  justify-center mx-auto">
                                            <button  className='mx-2 p-1.5 rounded-sm text-white font-bold bg-green-500'
                                                onClick={() => {
                                                    openEditModal(comment)
                                                    document.getElementById('editModal').showModal()

                                            }  }>Edit</button>
                                            <button onClick={()=>deleteComment(comment.id)}   className='mx-2 p-1.5 rounded-sm text-white font-bold bg-red-500'>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                                
                            ))
                            
                            }
                        </tbody>
                    </table>
                    {/* Edit Modal */}
                    <dialog  id="editModal" className="modal">
                    <div className="modal-box  w-full">
                        <form method="dialog ">
                        <p onClick={()=>document.getElementById('editModal').close()}    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</p>
                        </form>
                        <h3 className="font-bold text-lg mb-1">Edit Comment</h3>
                            <div className="mb-2">
                                <input type="text" name='content' value= {form.content}   
                                onChange={(e) => setForm({ ...form, content: e.target.value })}
                                placeholder="Type here" className="input input-bordered w-full mb-2" />
                                    <span className="text-red-500">
                                        {errors.content}
                                    </span>
                                </div>

                                <div className="mb-2">
                                <select name='post'   
                                onChange={(e) => setForm({ ...form, post: e.target.value })} 
                                    className="select select-bordered w-full ">
                                    <option disabled selected>Post</option>
                                        {
                                        posts.map(post =>(
                                            <option key={post.id} value={post.id}>{post.title}</option>
                                        ))
                                        }
                                </select>

                                    <span className="text-red-500">
                                        {errors.post}
                                    </span>
                                </div>
                                <button onClick={updateComment} className='btn mt-2 w-50'>Save </button>
                                <div  className='btn mt-2 w-50 mx-2' onClick={() => document.getElementById('editModal').close()}>Cancel</div>

                    </div>
                    </dialog>
                    {/* Edit Modal */}

                    <div className="flex justify-center my-5">
                        <Pagination links={comments.links}/>
                        
                    </div>
                   
                </div>
                
            </div>
        </div>
                 
    </AuthenticatedLayout>
    );
}

export default Index;