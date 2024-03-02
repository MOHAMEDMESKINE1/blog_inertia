import React, { useRef, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import { Link, useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import Search from '@/Components/blog/Search.jsx'
import useTags from '@/composables/tags/useTags.jsx';
import PrimaryButton from '@/Components/PrimaryButton';
import Modal from '@/Components/blog/Modal.jsx';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import FlashMessage from '@/Components/blog/FlashMessage';
import Table from '@/Components/blog/Table';
function Index({ auth,tags ,flash}) {

    const {deleteTag} = useTags()
    const { data, setData, errors, progress,post } = useForm({
        name: "",
    });

    const [form, setForm] = useState({ name: '' });
    const [editingTag, setEditingTag] = useState(null);

    const openEditModal = (tag) => {
        setEditingTag(tag);
        setForm({ name: tag.name }); // Assuming the tag has a 'name' property
       
      };

    // add tag
    const handleSubmit = (e) => {
        e.preventDefault()
        post(route('tags.store'))     
    }
    // delete tag
    const destroyTag = (id) => {
        deleteTag(id)
       
    }
    // update tag
    const updateTag = (e) => {
        e.preventDefault()
        Inertia.put(route('tags.update', { tag: editingTag.id }), form);
        setEditingTag(null);
    }

    //    tags table
    let headers = [ "#","NAME","ACTIONS"]
    const renderCell = (tag, header) => {
        switch (header) {
        case '#':
            return tag.id;
        case 'NAME':
            return tag.name;
        case 'ACTIONS':
            return <div className='flex flex-row jsutify-between'>

                        <div className="flex  justify-center mx-auto">
                            <button  className='mx-2 p-1.5 rounded-sm text-white font-bold bg-green-500'
                                onClick={() => {
                                    openEditModal(tag)
                                    document.getElementById('editModal').showModal()

                            }  }>Edit</button>
                            <button onClick={()=>destroyTag(tag.id)}   className='mx-2 p-1.5 rounded-sm text-white font-bold bg-red-500'>Delete</button>
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

                    <h1 className=''>Posts</h1>
                   
                    {/* message */}
                    <FlashMessage flash={flash}/>


                    {/* Create modal */}
                    <div className="flex justify-end w-full">
                        
                        <PrimaryButton  onClick={()=>document.getElementById('createModal').showModal()}>Create Tag</PrimaryButton>
                        {/* modal */}
                        <Modal id={'createModal'} name={'Create Post'}>
                            <p onClick={()=>document.getElementById('createModal').close()}    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</p>

                            <form onSubmit={handleSubmit}   encType='multipart/form-data'>
                                <div className="mb-2">
                                    <InputLabel htmlFor="name" value="Create Tag" className='font-bold text-xl text-white mb-1' />                                    <TextInput
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="input input-bordered w-full mb-2"
                                        autoComplete="username"
                                        isFocused={true}
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div className="modal-action">
                                    <PrimaryButton disabled={progress} type='submit' className='btn mt-2 w-50'>Save </PrimaryButton>
                                    <PrimaryButton   onClick={()=>document.querySelector('#createModal').close()} className='btn mt-2 w-50'>Cancel</PrimaryButton>
                                </div>

                            </form>
                        </Modal>
                        {/* modal */}
                    </div>
                    
                    {/*  Create modal */}

                    <div className="overflow-x-auto">

                    <Search url={route('tags.index')}/>

                    <Table
                     
                       data={tags.data} 
                       headers={headers} 
                       renderCell={renderCell}
                    />    


                    </div>    
                    
                    {/* Edit Modal */}
                       
                        <Modal id={'editModal'} name={'Update Tag'}>
                            <p onClick={()=>document.getElementById('editModal').close()}    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</p>
                            <form onSubmit={updateTag}   encType='multipart/form-data'>
                                <div className="mb-2">
                                    <InputLabel htmlFor="name" value="Update Tag" className='font-bold text-xl text-white mb-1' />                                    <TextInput
                                        id="name"
                                        type="text"
                                        name="name"
                                        value= {form.name}   
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        className="input input-bordered w-full mb-2"
                                        autoComplete="username"
                                        isFocused={true}
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div className="modal-action">
                                    <PrimaryButton disabled={progress} type='submit' className='btn mt-2 w-50'>Save </PrimaryButton>
                                    <PrimaryButton   onClick={()=>document.querySelector('#editModal').close()} className='btn mt-2 w-50'>Cancel</PrimaryButton>
                                </div>

                            </form>
                        </Modal>
                    {/* Edit Modal */}

                    <div className="flex justify-center my-5">
                            <Pagination links={tags.links}/>
                            
                    </div>
                </div>
            </div>
        </div>

          
       
        </AuthenticatedLayout>
    );
}

export default Index;