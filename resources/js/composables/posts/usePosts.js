import { Inertia } from "@inertiajs/inertia"
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const  usePosts = () =>{

 
     const deletePost = (url,id) => {
        
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

                Inertia.delete(url,id)

                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
          });
     }
     
     return {

        deletePost,
     }
}

export default usePosts;