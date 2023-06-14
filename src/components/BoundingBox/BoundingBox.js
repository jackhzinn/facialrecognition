import React from "react";
import './BoundingBox.css';


const BoundingBox = ({box, boxId, hw}) => {
    const {width, height} = hw;
    
    return (
            <div key={boxId} className='bounding-box' 
                style={{top:    box.top_row*height,
                        left:   box.left_col*width,
                        bottom: height - box.bottom_row*height,
                        right:  width  - box.right_col*width
                }}></div>
        );
    
}

export default BoundingBox;