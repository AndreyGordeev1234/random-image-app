import React from 'react';
import { ImageData } from 'src/types';
import './Image.scss';

interface Props {
  image: ImageData;
  onImageClick: (tag: string) => void;
}

export const Image: React.FC<Props> = ({ image, onImageClick }) => {
  const handleImageClick = () => onImageClick(image.tag);

  return (
    <div className="image p-2">
      <div className="image__wrapper">
        {image.urls.map((url, i) => (
          <img
            key={i}
            src={url}
            alt={`${image.tag}_${i}`}
            className="image__pic mb-1"
            onClick={handleImageClick}
          />
        ))}
      </div>
    </div>
  );
};
