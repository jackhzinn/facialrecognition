import React from "react";
//import BoundingBox from "../BoundingBox/BoundingBox.js";


const FaceRecognition = ({status, input, imgId ,bBoxes, confidences}) => {
    if (status) {
console.log("In FR")
console.log(status, input);
console.log(bBoxes, confidences, bBoxes.length);

        return (
            <div className='center ma'>
                <div className='absolute mt2'>
                    <img id={imgId} src={input} alt="looking for faces..." style={{width:"500px", height:"auto"}} />
                    {/*bBoxes.map((box, i) => (
                        <BoundingBox imgId={imgId} box={box} boxId={i} />
                    ))*/}
                </div>
            </div>
        );
    } else {
        return (
            <div>
                An Error occurred... wrong format or URL not found!<br />
                <div style={{maxWidth:"800px"}}>
                {input}
                </div>
            </div>
        )
    }
}

export default FaceRecognition;