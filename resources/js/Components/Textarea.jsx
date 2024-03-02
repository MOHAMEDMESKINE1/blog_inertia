import React from 'react';

function Textarea({...props}) {
    return (
        <textarea
            {...props}
            className={
                'textarea textarea-bordered w-full mb-2 focus:border-white ' 
                
            }
        ></textarea>
    );
}

export default Textarea;