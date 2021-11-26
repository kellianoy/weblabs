/** @jsxImportSource @emotion/react */
import React from 'react';

export default function ScaleUp({ 
    timing = 300, 
    scale = 1.5, 
    translateX = 0, 
    translateY = 0, 
    children })
{
    const [isTouched, setIsTouched] = React.useState(false);
    const style = {
        transform: isTouched
            ? `scale(${scale}) translate(${translateX}%, ${translateY}%)`
            : `scale(1)`,
        transition: `transform ${timing}ms`,
    };
    const end = () => {
        setIsTouched(false);
    }
    const start = () => {
        setIsTouched(true);
    }
    return (
        <span onMouseEnter={start} onMouseLeave={end} style={style}>
            {children}
        </span>
    )
};