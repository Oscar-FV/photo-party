import React from "react";

const Gallery = ( {items, children} ) => {

    return (
        <div className="mb-5 grid grid-cols-3">
            {children}
        </div>
    )
}

export default Gallery