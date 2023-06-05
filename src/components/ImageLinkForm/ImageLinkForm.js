import React from "react";
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onDetectSubmit}) => {
    return (
        <div> 
            <p className='f3'>
                {'Magic brain will detect faces in your photos. Give it a try!'}
            </p>
            <div className='center'>
                <div className='form pa4 br3 shadow-5 center'>
                    <input type="text" className='f4 pa2 w-70 center' onChange={onInputChange} />
                    <button 
                            className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
                            onClick={onDetectSubmit}>
                        Detect
                        </button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;