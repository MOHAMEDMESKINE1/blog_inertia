import React, { useRef, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import {  useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import Swal from "sweetalert2";  
import Select from '@/Components/blog/components/Select';
import Modal from '@/Components/blog/components/Modal';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import Table from '@/Components/blog/components/Table';

function Index({auth,postTags,posts,tags }) {

    const { data, setData, errors, post,processing } = useForm({
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
   
    // post tags
    // let headers = [ "#","POST","TAG","CREATED_AT","UPDATED_AT","ACTIONS"]
    // const renderCell = (postTag, header) => {
    //     switch (header) {
    //     case '#':
    //         return postTag.posts;
    //     case 'NAME':
    //         return postTag.tags;

    //     case 'CREATED_AT':
    //         return postTag.created_at;

    //     case 'UPDATED_AT':
    //         return postTag.updated_at;
    //     case 'ACTIONS':
    //         return <div className='flex flex-row jsutify-between'>

    //                     <div className="flex  justify-center mx-auto">
    //                         <button  className='mx-2 p-1.5 rounded-sm text-white font-bold bg-green-500'
    //                             onClick={() => {
    //                                 openEditModal(postTag)
    //                                 document.getElementById('editModal').showModal()

    //                         }  }>Edit</button>
    //                         <button onClick={()=>deletePosTag(postTag.id)}   className='mx-2 p-1.5 rounded-sm text-white font-bold bg-red-500'>Delete</button>
    //                     </div>

    //                 </div>
    //     default:
    //         return ''; // Handle additional headers if needed
    //     }
    // };
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
                        <PrimaryButton  onClick={()=>document.getElementById('createModal').showModal()}>Create Post Tag</PrimaryButton>
                           
                           <Modal id={"createModal"}  title={'Add a PosTag'}>
                                <form onSubmit={handleSubmit}   encType='multipart/form-data'>
                                <p onClick={()=>document.getElementById('createModal').close()}    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</p>

                                        <div className="my-2">
                                           
                                            <Select name={"post_id"}  onChange={(e)=> setData("post_id",e.target.value)}>
                                                
                                                 <option disabled >Choose Post</option>
                                                {
                                                    posts.map(post =>(
                                                    
                                                        <option  value={post.id} >{post.title}</option>
                                                        
                                                    
                                                    ))
                                                }
                                            </Select>
                                            <InputError message={errors.post_id} className='mt-2'/>

                                        </div>
                                        <div className="mb-2">
                                        <Select name='tag_id' onChange={(e)=> setData("tag_id",e.target.value)}>
                                            <option disabled >Choose Tag</option>
                                               
                                               {
                                                tags.map(tag =>(
                                                   
                                                    <option  selected value={tag.id} >{tag.name}</option>
                                                   
                                                 
                                                ))
                                               }
                                        </Select>                                            
                                        <InputError message={errors.tag_id} className='mt-2'/>


                                        </div>
                                        <div className="modal-action flex justify-start">
                                            <PrimaryButton disabled={processing} type='submit' className='btn mt-2 w-50'>Save </PrimaryButton>
                                        </div>
                                </form>
                           </Modal>
                        </div>
                    {/*  Create modal */}

                    <div className="overflow-x-auto text-center">
                        <table className="table  rounded   bg-gray-500  text-center shadow-sm" >
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
                             {
                               postTags && postTags.data.map(postTag =>(
                                    <tr  key={postTag.id} className="bg-base-100">
                                        <th>{postTag.id}</th>
                                    
                                        <th>
                                        {
                                           
                                            postTag.posts
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
                          {/* <Table
                     
                            data={postTags.data} 
                            headers={headers} 
                            renderCell={renderCell}
                        />   */}
                    </div>    
                    
                    {/* Edit Modal */}
                        <Modal  id={'editModal'} title={"Edit Post Tag"} className="modal">
                            <form>
                                <p onClick={()=>document.getElementById('editModal').close()}    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</p>

                                    <div className="mb-2">
                                    <Select name='post_id' value={form.post_id} onChange={(e) => setForm({ ...form, post_id: e.target.value })}>
                                        <option disabled selected>Choose Post</option>
                                            
                                            {
                                            posts.map(post =>(
                                                
                                                <option value={post.id} >{post.title}</option>
                                                
                                            ))
                                            }
                                        </Select>                                            

                                    </div>
                                    <div className="mb-2">
                                    <Select name='tag_id' value={form.tag_id} onChange={(e) => setForm({ ...form,tag_id: e.target.value })}>
                                        <option disabled selected>Choose Tag</option>
                                            
                                            {
                                            tags.map(tag =>(
                                                
                                                <option value={tag.id} >{tag.name}</option>                                                 
                                            ))
                                            }
                                        </Select>                                            
                                        

                                    </div>
                                
                                    <PrimaryButton  onClick={updatePostTag} className='btn mt-2 w-50'>Save </PrimaryButton>
                            </form>
                         </Modal>
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