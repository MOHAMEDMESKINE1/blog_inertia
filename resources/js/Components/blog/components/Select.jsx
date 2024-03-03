import React from 'react';

function Select({children,...props}) {
    return (
        <div>
           <select  {...props}  className="select select-primary w-full">
                {children}                                
            </select>                                            
        </div>
    );
}

export default Select;