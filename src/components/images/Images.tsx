import React from 'react';
import { ImageData } from 'src/types';
import { Image } from '../image/Image';
import './Images.scss';

interface Props {
  images: ImageData[];
  onImageClick: (tag: string) => void;
}

export const Images: React.FC<Props> = ({ images, onImageClick }) => {
  return (
    <div className="images mt-4">
      {images.map((image, i) => (
        <Image key={i} image={image} onImageClick={onImageClick} />
      ))}
    </div>
  );
};
