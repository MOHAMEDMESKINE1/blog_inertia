import React, { useRef, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import {  useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import Swal from "sweetalert2";  
import Search from '@/Components/blog/components/Search.jsx'
import Modal from '@/Components/blog/components/Modal.jsx';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import Table from '@/Components/blog/components/Table';

function Index({ auth,categories }) {

    const { data, setData, errors, post } = useForm({
        name: "",
    });
    const [editingCategory, setEditingCategory] = useState(null);
    const [form, setForm] = useState({ name: '' });

    const openEditModal = (category) => {
        setEditingCategory(category);
        setForm({ name: category.name }); // Assuming the tag has a 'name' property
       
      };
   
    // update tag
    const updateCategory = (e) => {
        e.preventDefault()
       
        Inertia.put(route('categories.update', { category: editingCategory.id }), form);
        setEditingCategory(null);
    }

    // add category
    const handleSubmit = (e) => {
        e.preventDefault()
        post(route('categories.store'))
    }

    // delete category
    const deleteCategory = (id) => {

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

                Inertia.delete(route('categories.destroy',id))
                
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
          });
    }
    
    // categories table
     let headers = [ "#","NAME","CREATED_AT","ACTIONS"]
     const renderCell = (category, header) => {
         switch (header) {
         case '#':
             return category.id;
         case 'NAME':
             return category.name;
         case 'CREATED_AT':
             return category.created_at;
         case 'ACTIONS':
             return <div className='flex flex-row jsutify-between'>
 
                         <div className="flex  justify-center mx-auto">
                             <button  className='mx-2 p-1.5 rounded-sm text-white font-bold bg-green-500'
                                 onClick={() => {
                                     openEditModal(category)
                                     document.getElementById('editModal').showModal()
 
                             }  }>Edit</button>
                             <button onClick={()=>deleteCategory(category.id)}   className='mx-2 p-1.5 rounded-sm text-white font-bold bg-red-500'>Delete</button>
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
                    <h1 className=''>Categories</h1>
                  
                    {/* Create modal */}
                        <div className="flex justify-end w-full">
                        <PrimaryButton onClick={()=>document.getElementById('createModal').showModal()}>Add Category</PrimaryButton>
                            
                            <Modal id={"createModal"} title={'Add category'} className="modal">
                                <p onClick={()=>document.getElementById('createModal').close()}    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</p>
                                    
                                    <form onSubmit={handleSubmit}>
                                        
                                        <div className="mb-2">
                                            <TextInput
                                                id="name"
                                                type="text"
                                                name="name"
                                                value= {data.name}   
                                                onChange={(e) => setData({'name': e.target.value })}
                                                className="input input-bordered w-full mb-2"
                                                autoComplete="username"
                                                isFocused={true}
                                            />
                                            <InputError message={errors.name} className="mt-2" />
                                        </div>
                                    
                                        <PrimaryButton type="submit" className='btn mt-2 w-50'>Save </PrimaryButton>

                                    </form>
                                    
                            </Modal>
                        </div>


                    {/* search */}

                    <Search url={'categories.index'}/>

                    <Table
                            data={categories.data} 
                            headers={headers} 
                            renderCell={renderCell}
                        /> 
                    
                    {/* Edit Modal */}
                        <Modal   id="editModal" title={"Edit Category"} className="modal">

                            <p onClick={()=>document.getElementById('editModal').close()}    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</p>
                                    
                            <div className="my-2">
                                <TextInput
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
                        
                            <PrimaryButton  onClick={updateCategory}   className='btn mt-2 w-50'>Save </PrimaryButton>

                         </Modal>
                    {/* Edit Modal */}


                    {/* pagination */}
                    <div className="flex justify-center my-5">
                            <Pagination links={categories.links}/>
                            
                    </div>
                </div>
            </div>
        </div>

          
       
        </AuthenticatedLayout>
    );
}

export default Index;