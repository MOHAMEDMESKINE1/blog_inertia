import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';

function Edit({auth,post}) {
   
    const [ formData, setFormData ] = useState({
        id:post.id,
        title: post.title ,
        description: post.description ,
        image:  null ,
        
    });
  
   
    
    const handleChange = (e) => {
        const { name, value, files } = e.target;
    
        setFormData((prevData) => ({
          ...prevData,
          [name]: name === 'image' ? files[0] : value,
        }));
      };
  
      const handleSubmit = (e) => {
        e.preventDefault();
    
        const form = new FormData();
        form.append('title', formData.title);
        form.append('description', formData.description);
        form.append('image', formData.image);
        form.append('_method', 'put');
    
        Inertia.post(route('posts.update',formData.id), form, {
          onSuccess: () => {
            // Handle success, maybe redirect or show a success message
            console.log("success");
          },
        });
      };

    return (
        <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
    >
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white p-12 overflow-hidden shadow-sm sm:rounded-lg">

          
                    <h3 className="font-bold text-lg mb-1">Edit Poste</h3>
                    <form onSubmit={handleSubmit}    encType='multipart/form-data'>
                        
                        <input type="text" name='title' value={formData.title}  onChange={handleChange}  placeholder="Type here" className="input input-bordered w-full mb-2" />
                        <span className="text-red-600">
                                    {/* {formErrors.title} */}
                                </span>
                        
                        <textarea name='description' value={formData.description}  onChange={handleChange} className="textarea textarea-bordered w-full mb-2" placeholder="Bio"></textarea>
                        <span className="text-red-600">
                                    {/* {formErrors.description} */}
                        </span>
                        
                        <input type="file" name='image' onChange={handleChange} className="file-input file-input-bordered w-full mb-2 " />
                        <span className="text-red-600">
                            {/* {formErrors.image} */}
                        </span>
                        <button type='submit' className='btn mt-2 w-50'>Save</button>
                         
                    </form>
                </div>
            </div>
        </div>

          
       
        </AuthenticatedLayout>
    );
}

export default Edit;