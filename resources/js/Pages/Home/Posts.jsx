
import React from 'react';
import { usePage } from '@inertiajs/react'
import SearchSide from './SearchSide';

function Posts() {

    const { posts } = usePage().props;
    console.log(posts);
    return (
        <> 
            <div className="grid grid-cols-3  gap-y-5">
            {
                posts && posts.data.map(post => (<div className="card w-96 bg-base-100 shadow-xl">
                        <figure><img src={"storage/posts/"+post.image}alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{post.title}</h2>
                            <p>{post.description}</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">{post.created_at}</button>
                            </div>
                        </div>
                    </div>
                  
                ))
            }
           
                       
                       
           </div>
        </>
    );
}

export default Posts;