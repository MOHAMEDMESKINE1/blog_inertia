import React, { useRef, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import { Link, useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { debounce } from 'lodash';
import Search from '@/Components/blog/Search.jsx'
import Table from '@/Components/blog/Table';
import Modal from '@/Components/blog/Modal.jsx';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';


function Index({ auth,posts }) {

    const { data, setData, errors, post,processing } = useForm({
        title: "",
        description: "",
    });
   
    const handleImageChange = (e) => {
        setData('image', e.target.files[0])
    
    };
    const handleSubmit = (e) => {
        e.preventDefault()

        post(route('posts.store'))
    }

    const deletePost = (id) => {
    
        Inertia.delete(route('posts.destroy',id))
    }





    // display   table  data
    let headers = [ "#","IMAGE","TITLE","DESCRIPTION","POSTED BY","ACTIONS"]
    
    const renderCell = (post, header) => {
        switch (header) {
          case '#':
            return post.id;
          case 'IMAGE':
            return <div>
                { post.image ?
                    <img  className='mask mask-hexagon-2' src={"storage/posts/"+post.image} alt="" width={55} />
                    :
                    <img src={post.image} alt="" width={55} />
                };
            </div>
          case 'TITLE':
            return post.title;
          case 'DESCRIPTION':
            return post.description;
          case 'POSTED BY':
            return post.user.name;

          case 'ACTIONS':
            return <div className='flex flex-row jsutify-between'>

                <Link  href={route('posts.show',post.id)} className='mx-2 p-1.5 rounded-sm text-white font-bold bg-green-500'>Details</Link>
                <Link  href={route('posts.edit',post.id)} className='mx-2 p-1.5 rounded-sm text-white font-bold bg-indigo-500'>Edit</Link>
                <button onClick={()=>deletePost(post.id)}   className='mx-2 p-1.5 rounded-sm text-white font-bold bg-red-500'>Delete</button>

            </div>;
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
                    <h1 className=''>Posts</h1>
                    {/* modal */}
                    <div className="flex justify-end w-full">
                        
                        <PrimaryButton  onClick={()=>document.getElementById('createModal').showModal()}>Create Poste</PrimaryButton>
                            
                        <Modal id={'createModal'} title={'Create Post'}>
                            <form onSubmit={handleSubmit}   encType='multipart/form-data'>
                                
                            <div className="mb-2">
                                <TextInput
                                    id="title"
                                    type="title"
                                    name="title"
                                    value={data.title}
                                    className="input input-bordered w-full mb-2"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) => setData('title', e.target.value)}
                                />

                                <InputError message={errors.title} className="mt-2" />
                            </div>
                            
                            <div className="mb-2">
                                    <textarea name='description' value={data.description}  onChange={(e)=> setData("description",e.target.value)} className="textarea textarea-bordered w-full mb-2" placeholder="Bio"></textarea>
                                    <InputError message={errors.description} className="mt-2" />
                            </div>
                            <div className="mb-2">
                                <TextInput
                                    id="image"
                                    type="file"
                                    name="image"
                                    className="input input-bordered w-full mb-2"
                                    autoComplete="image"
                                    isFocused={true}
                                    onChange={handleImageChange}
                                />
                                <InputError message={errors.title} className="mt-2" />

                                </div>
                                <div className="modal-action">
                                    <PrimaryButton disabled={processing} type='submit' className='btn mt-2 w-50'>Save </PrimaryButton>
                                    <PrimaryButton rimaryButton  onClick={()=>document.querySelector('#createModal').close()} className='btn mt-2 w-50'>Cancel</PrimaryButton>
                                </div>

                            </form>
                            </Modal>
                    </div>
                    {/* modal */}


                    <div className="overflow-x-auto"> 
                    
                      <Search url={route('posts.index')} />
                      <Table
                     
                       data={posts.data} 
                       headers={headers} 
                       renderCell={renderCell}
                       />
 
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