import React from "react";
import BoundingBox from "../BoundingBox/BoundingBox.js";
import './FaceRecognition.css';


const FaceRecognition = ({status, imageUrl, imgId ,bBoxes, confidences}) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id={imgId} src={imageUrl} alt="looking for faces..." width="500px"  height="auto" />
                {bBoxes.map((box, i) => 
                    <BoundingBox imgId={imgId} box={box} boxId={i} />
                )}
            </div>
        </div>
    );
}

export default FaceRecognition;