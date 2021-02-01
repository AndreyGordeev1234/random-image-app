import React, { useEffect } from 'react';
import { ImageData } from 'src/types';
import { Image } from '../image/Image';
import './ImageGroup.scss';

interface Props {
  images: ImageData[];
  onImageClick: (tag: string) => void;
}

interface GroupOfImages {
  [key: string]: ImageData[];
}

export const ImageGroup: React.FC<Props> = ({ images, onImageClick }) => {
  const groups: GroupOfImages = {};

  images.forEach((image) => {
    const tag = image.tag;
    if (tag in groups) {
      groups[tag].push(image);
    } else {
      groups[tag] = [image];
    }
  });

  return (
    <div className="groups mt-4">
      {Object.keys(groups).map((group) => (
        <div className="group p-3" key={group}>
          <p className="group__name">{group}</p>
          {groups[group].map((image, i) => (
            <Image key={i} image={image} onImageClick={onImageClick} />
          ))}
        </div>
      ))}
    </div>
  );
};
