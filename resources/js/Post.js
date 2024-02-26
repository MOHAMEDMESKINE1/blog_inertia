import { Inertia } from "@inertiajs/inertia";
import { useForm } from "@inertiajs/inertia-react";

export class Post {
    
    static debounceSearch = ((term)=>{

        Inertia.get(route('posts.index', { search: term }));
          
    })
    static handleSubmit = () => {
        
        Inertia.post(route('posts.store'))
    }
}