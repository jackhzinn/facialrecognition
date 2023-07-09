import React from "react";
import BoundingBox from "../BoundingBox/BoundingBox.js";
import './FaceRecognition.css';


const FaceRecognition = ({imageUrl, imgId ,bBoxes, hw}) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id={imgId} src={imageUrl} alt="looking for faces..." width="500px"  height="auto" />
                {bBoxes.map((box, i) => 
                    <BoundingBox box={box} hw={hw} key={i}/>
                )}
            </div>
        </div>
    );
}

export default FaceRecognition;