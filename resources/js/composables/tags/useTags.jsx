import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const  useTags = () =>{

   const deleteTag = (id) => {
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

            Inertia.delete(route('tags.destroy',id))
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }
      });
   }
  


    return {
        deleteTag,
      
     
    }
}
export default useTags;