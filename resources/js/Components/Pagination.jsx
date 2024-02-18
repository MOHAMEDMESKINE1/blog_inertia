import { Link } from '@inertiajs/react';
import React from 'react';

const Pagination = ({ links }) => {

    function getClassName(active) {
        if(active) {
            return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white focus:border-primary focus:text-primary bg-blue-700 text-white";
        } else{
            return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white focus:border-primary focus:text-primary";
        }
    }
    return (
        links.length > 3 && (
            <div className="mb-4">
                <div className="flex flex-wrap mt-8">
                    {links.map((link, key) => (
                            link.url === null ?
                                    (<div
                                            className="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded"
                                        >{link.label}</div>) :
  
                                    (<Link
                                                className={getClassName(link.active)}
                                                href={ link.url }
                                            >{link.label}</Link>)
                                    ))}
                </div>
            </div>
        )
    );
//   return (
//     <div>
//       {links.length > 3 && (
//         <div className="flex flex-wrap -mb-1">
//           {links.map((link, index) => (
//             <div
//               key={index}
//               className={`mr-1 mb-1 px-4 py-3 text-sm leading-4 ${
//                 link.url === null
//                   ? 'text-gray-400 border rounded'
//                   : `border rounded hover:bg-white focus:border-indigo-500 focus:text-indigo-500 ${link.active ? 'bg-blue-700 text-white' : ''}`
//               }`}
//             >
//               {link.url !== null && (
//                 <Link href={link.url} className="px-4 py-3 text-sm leading-4">
//                   {link.label}
//                 </Link>
//               )}
//             </div>
//           ))}
//         </div>
//       )} 
     
//     </div>
//   );
};

export default Pagination;
