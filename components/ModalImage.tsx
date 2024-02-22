import React from 'react';
import styles from './ModalImage.module.sass';

function ModalImage(props:any) {
    const { image, alt, display } = props;

    return (
        <div className="">
            <img src={image} alt={alt} />
        </div>
    );
}

export default ModalImage;