import React, { useRef, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import {  useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import Swal from "sweetalert2";  
import Search from '@/Components/blog/components/Search.jsx'
import Modal from '@/Components/blog/components/Modal.jsx';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import Select from '@/Components/blog/components/Select';
import Table from '@/Components/blog/components/Table';

function Index({auth,posts,comments}) {
    const { data, setData, errors, post } = useForm({
        content: "",
        post: null,
    });
    const [editingComment, setEditingComment] = useState(null);
    const [form, setForm] = useState({ content: '',post:null });

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

    //    tags table
    let headers = [ "#","POST","CONTENT","POSTED BY","CREATED_AT","ACTIONS"]

    const renderCell = (comment, header) => {
        switch (header) {
        case '#':
            return comment.id;
        case 'POST':
            return comment.post.title;

        case 'CONTENT':
            return comment.content;

        case 'POSTED BY':
            return comment.user.name;
        case 'CREATED_AT':
            return comment.created_at;
        case 'ACTIONS':

            return <div className='flex flex-row jsutify-between'>

                        <div className="flex  justify-center mx-auto">
                            <button  className='mx-2 p-1.5 rounded-sm text-white font-bold bg-green-500'
                                onClick={() => {
                                    openEditModal(comment)
                                    document.getElementById('editModal').showModal()

                            }  }>Edit</button>
                            <button onClick={()=>deleteComment(comment.id)}   className='mx-2 p-1.5 rounded-sm text-white font-bold bg-red-500'>Delete</button>
                        </div>

                    </div>
        default:
            return ''; // Handle additional headers if needed
        }
    };
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
                      <PrimaryButton  onClick={()=>document.getElementById('createModal').showModal()}>Add Comment</PrimaryButton>
                        <Modal id={"createModal"}  title={"Add Comment"} >

                            <p onClick={()=>document.getElementById('createModal').close()}    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</p>
                            
                            <form onSubmit={handleSubmit} >
                                
                            <div className="my-2">
                                <TextInput
                                    id="content"
                                    type="text"
                                    name="content"
                                    value={data.content}
                                    className="input input-bordered w-full mb-2"
                                    autoComplete="content"
                                    isFocused={true}
                                    onChange={(e) => setData('content', e.target.value)}
                                />
                                <InputError message={errors.content} className="mt-2" />

                            </div>
                            <div className="mb-2">
                                <Select name='post' onChange={(e)=> setData("post",e.target.value)}   className="select select-bordered w-full ">
                                    <option disabled >Post</option>
                                        {
                                        posts.map(post =>(
                                            <option key={post.id} value={post.id}>{post.title}</option>
                                        ))
                                        }
                                </Select>

                                <InputError message={errors.post} className="mt-2" />

                            </div>
                            
                                <PrimaryButton className='btn mt-2 w-50'>Save </PrimaryButton>
                            </form>
                              
                        </Modal>
                      </div>
                    {/*  Create modal */}


                    <Search url={'comments.index'}/>

                  
                    <Table
                     
                     data={comments.data} 
                     headers={headers} 
                     renderCell={renderCell}
                  /> 



                {/* Edit Modal */}
                    <Modal   id={"editModal"}   title={'Edit Comment'} className="modal">
                            
                            <p onClick={()=>document.getElementById('editModal').close()}    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</p>
            
                                <div className="my-2">
                                    <TextInput
                                        id="content"
                                        type="text"
                                        name="content"
                                        value={form.content}
                                        className="input input-bordered w-full mb-2"
                                        autoComplete="content"
                                        isFocused={true}
                                        onChange={(e) => setForm({ ...form, content: e.target.value })}
                                    />
                                    <InputError message={errors.content} className="mt-2" />

                                </div>

                                <div className="mb-2">

                                    <Select name='post'   
                                    value={form.post}
                                    onChange={(e) => setForm({ ...form, post: e.target.value })} 
                                        className="select select-bordered w-full ">
                                        <option disabled >Post</option>
                                            {
                                            posts.map(post =>(
                                                <option key={post.id}  value={post.id}>{post.title}</option>
                                            ))
                                            }
                                    </Select>

                                    <InputError message={errors.post} className="mt-2" />

                                    </div>
                                    <PrimaryButton onClick={updateComment} className='btn mt-2 w-50'>Save </PrimaryButton>

                        
                    </Modal>
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