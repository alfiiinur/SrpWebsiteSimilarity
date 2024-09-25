import React, { useEffect } from 'react';
import {MathJax, MathJaxContext} from 'better-react-mathjax';

const MathJaxComponent = ({ math }) => {
    return (
        <MathJax>
            {math}
        </MathJax>
    );
};


export default MathJaxComponent






