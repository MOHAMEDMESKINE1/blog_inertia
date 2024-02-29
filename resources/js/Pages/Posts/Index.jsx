import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import { Link, useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { debounce } from 'lodash';
import Swal from 'sweetalert2';
// import { Editor } from '@tinymce/tinymce-react';

function Index({ auth,posts,flash }) {

    // const {flash} = usePage().props;

    const { data, setData, errors, post } = useForm({
        title: "",
        description: "",
    });
   

    const [searchTerm, setSearchTerm] = useState('');
    
    // search change input
    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
      
    };
  
    // store image
    const handleImageChange = (e) => {
        setData('image', e.target.files[0])
    
    };
    // store
    const handleSubmit = (e) => {
    e.preventDefault()

        post(route('posts.store'))
    }

    // delete
    const deletePost = (id) => {
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

                Inertia.delete(route('posts.destroy',id))
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
          });
    }
    // search
          // handleSearch 
          const handleSearch = () => {
            // Perform the search and redirect to the search results page
    
            Inertia.get(route('posts.index'),{search:searchTerm} );
          };
    useEffect(() => {
        handleSearch();

    }, [flash,searchTerm]);

    return (
        <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
    >
        <div className="py-12">
            
            <div className="mx-auto sm:px-6 lg:px-8">
                <div className="bg-white p-12 overflow-hidden shadow-sm sm:rounded-lg">
                    <h1 className=''>Posts </h1>
                     {
                        flash &&   flash.success &&(

                            <div role="alert" className="alert alert-success my-2" >

                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            
                            <span className='text-white font-bold'>{flash.success}</span>

                            </div>
                            )
          
                    }

                   

                    {/* modal */}
                        <div className="flex justify-end w-full">
                        <button className="btn btn-outline text-gray-900 p-1.5 rounded-sm shadow-sm my-3 "  onClick={()=>document.getElementById('createModal').showModal()}>Create Poste</button>
                            <dialog id="createModal" className="modal">
                            <div className="modal-box  w-full">
                                <form method="dialog " > 
                                {/* if there is a button in form, it will close the modal */}
                                <p onClick={()=>document.getElementById('createModal').close()}    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</p>
                                </form>
                                <h3 className="font-bold text-lg mb-1">Create Poste</h3>
                               
                              
                                <form   onSubmit={handleSubmit} encType='multipart/form-data'>
                                    
                                    <div className="mb-2">
                                    <input type="text" name='title' value={data.title}  onChange={(e)=> setData("title",e.target.value)}  placeholder="Type here" className="input input-bordered w-full mb-2" />
                                        <span className="text-red-500">
                                            {errors.title}
                                        </span>
                                    </div>
                                   
                                    <div className="mb-2">
                                    <textarea name='description' value={data.description}  onChange={(e)=> setData("description",e.target.value)} className="textarea textarea-bordered w-full mb-2" placeholder="Bio"></textarea>
                                        <span className="text-red-500">
                                            {errors.description}
                                        </span>
                                    </div>
                                        {/* <div id="editor">
                                            <Editor
                                            value={data.description}
                                            textareaName='description'
                                            onChange={(e)=> setData("description",e.target.value)}
                                            apiKey='9ht12wb5tyqgqpg6jr12rkaora4vvi3qq3fb4fdlpdvwpe4v'
                                            init={{
                                            plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss',
                                            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                            tinycomments_mode: 'embedded',
                                            tinycomments_author: 'Author name',
                                            mergetags_list: [
                                            { value: 'First.Name', title: 'First Name' },
                                            { value: 'Email', title: 'Email' },
                                            ],
                                            ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                                            }}
                                            initialValue="Welcome to TinyMCE!"
                                            />
                                        </div> */
                                        }

                                    
                                    
                                    <div className="mb-2">
                                    <input type="file" name='image' onChange={handleImageChange} className="file-input file-input-bordered w-full mb-2 " />
                                    <span className="text-red-500">
                                            {errors.image}
                                    </span>
                                    </div>

                                    <button  type='submit' className='btn mt-2 w-50'>Save </button>
                                </form>
                            </div>
                            </dialog>
                        </div>
                    {/* modal */}


                    <div className="overflow-x-auto">


                        <div className="my-2 flex justify-end">

                        <form  onSubmit={handleSearch} method='get'>
                        <input
                         type="text"
                          name='search' 
                          value={searchTerm} 
                          onChange={handleInputChange} 
                        //  onChange={(e) =>setSearchTerm(e.target.value)}
                           className="input input-bordered  mx-2 mb-2" 
                          placeholder='search ...' />
                          
                        <button type='submit' className='btn btn-outline btn-success'>Search</button>

                        </form>
                        </div>

                        <table className="table  rounded  bg-gray-500  text-center shadow-sm" >
                            {/* head */}
                            <thead className='text-white'>
                            <tr>
                                <th>#</th>
                                <th>IMAGE</th>
                                <th>TITLE</th>
                                <th>DESCRIPTION</th>
                                <th>POSTED BY</th>
                                <th>ACTION</th>
                            </tr>
                            </thead>
                            <tbody>
                            {/* row 1 */}
                             {
                                posts.data.map(post =>(
                                    <tr className="bg-base-100">
                                        <th>{post.id}</th>
                                        <td >
                                            { post.image ?
                                                <img  className='mask mask-hexagon-2' src={"storage/posts/"+post.image} alt="" width={55} />
                                                :
                                                <img src={post.image} alt="" width={55} />
                                             }
                                        </td>
                                        
                                        <td>{post.title}</td>
                                        <td>{post.description?.slice(10,80)}...</td>
                                        <td>{post.user.name}</td>
                                        <td>
                                            <div className="flex flex-row jsutify-between">
                                                <Link  href={route('posts.show',post.id)} className='mx-2 p-1.5 rounded-sm text-white font-bold bg-green-500'>Details</Link>
                                                <Link  href={route('posts.edit',post.id)} className='mx-2 p-1.5 rounded-sm text-white font-bold bg-indigo-500'>Edit</Link>
                                                <button onClick={()=>deletePost(post.id)}   className='mx-2 p-1.5 rounded-sm text-white font-bold bg-red-500'>Delete</button>
                                               
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