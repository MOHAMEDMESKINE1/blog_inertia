import React from 'react';

const Modal = ({id,title,children}) => {
    return (
        <div>
            <dialog id={id} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">
                        {title}
                    </h3>
                    <div className="modal-content">
                        {children}
                        
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default Modal;