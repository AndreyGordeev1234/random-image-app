import React from 'react';
import { ImageGroup } from '../imageGroup/ImageGroup';
import { Images } from '../images/Images';
import { InputGroup } from '../inputGroup/InputGroup';
import './App.scss';
import { useImageApp } from './hooks/useImageApp';

export const App: React.FC<{}> = () => {
  const {
    tag,
    setTag,
    groupByTag,
    state,
    handleLoad,
    handleClear,
    handleGroupByTag,
    handleImageClick,
  } = useImageApp();

  return (
    <div className="container mt-3 mb-5">
      <InputGroup
        tag={tag}
        setTag={setTag}
        onLoad={handleLoad}
        loading={state.loading}
        onClear={handleClear}
        error={state.error}
        onGroup={handleGroupByTag}
        isGrouped={groupByTag}
      />
      {groupByTag ? (
        <ImageGroup images={state.data} onImageClick={handleImageClick} />
      ) : (
        <Images images={state.data} onImageClick={handleImageClick} />
      )}
    </div>
  );
};
