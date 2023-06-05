import React from "react";
import './BoundingBox.css';


const BoundingBox = ({imgId, box, boxId}) => {
console.log('IN BOUNDING BOX')    
    const imgFaces = document.getElementById(imgId);
    const width = imgFaces.width;
    const height= imgFaces.height;
console.log(boxId, width, height);   

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