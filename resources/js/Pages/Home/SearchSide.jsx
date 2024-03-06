 import Search from '@/Components/blog/components/Search';
import { usePage } from '@inertiajs/react';
import React from 'react';
 
 function SearchSide() {
    const {posts} = usePage().props;
    return (
        <div>
            <Search url={route('home.search')}/>
            {
                posts && posts.data.map(post => (
                        <div className=" flex justify-center">
                            <ul className="">
                                <li className="">{post.title}</li>
                                <li>{post.description}</li>
                                <li className="card-actions justify-end"></li>
                            </ul>
                        </div>
                   
                  
                ))
            }
            
        </div>
    );
 }
 
 export default SearchSide;