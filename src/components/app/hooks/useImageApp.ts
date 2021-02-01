import { useState, useReducer, useRef } from 'react';
import {
  dataRequested,
  dataLoaded,
  dataError,
  dataClear,
} from '../../../store/actions';
import { reducer, initalState } from '../../../store/reducer';
import { generateRandomTag } from '../../../utils/generateRandomTag';
import { validateInput } from '../../../utils/validateInput';

export const useImageApp = () => {
  const [tag, setTag] = useState('');
  const [groupByTag, setGroupByTag] = useState(false);

  const [state, dispatch] = useReducer(reducer, initalState);

  let timeoutId = useRef<number | null>(null);

  const handleLoad = async () => {
    if (timeoutId.current) clearTimeout(timeoutId.current);

    dispatch(dataRequested());
    try {
      const tagTrimmed = tag.trim();
      if (tagTrimmed === '') {
        throw new Error("Заполните поле 'тег'");
      }

      if (!validateInput(tagTrimmed)) {
        throw new Error(
          'Ввод любых символов в поле кроме букв латинского алфавита и “,” запрещен',
        );
      }

      let tagSplitted = tagTrimmed.split(',');

      tagSplitted = tagSplitted
        .map((tag) => tag.trim().toLowerCase())
        .filter((tag) => tag.trim() !== '');

      if (tagSplitted.length === 1 && tagSplitted[0] === 'delay') {
        tagSplitted[0] = generateRandomTag();
        timeoutId.current = window.setTimeout(handleLoad, 5000);
      }

      const requests = tagSplitted.map((tag) =>
        fetch(
          `https://api.giphy.com/v1/gifs/random?api_key=gTJAO48YcpmrADUyo4opy4ES4g7iDBxx&tag=${tag}`,
        ),
      );
      const responses = await Promise.all(requests);

      const urls: string[] = [];

      for (let resp of responses) {
        if (resp.status !== 200) throw new Error('Произошла http ошибка');

        const { data } = await resp.json();

        if (data.image_url) urls.push(data.image_url);
      }

      if (!urls.length) {
        throw new Error('По тегу ничего не найдено');
      }

      dispatch(
        dataLoaded({
          urls,
          tag: tagSplitted.join(', '),
        }),
      );
    } catch (e) {
      if (e.message === 'Failed to fetch') {
        dispatch(dataError(new Error('Произошла http ошибка')));
      } else {
        dispatch(dataError(e));
      }
    }
  };

  const handleClear = () => dispatch(dataClear());

  const handleGroupByTag = () => setGroupByTag((prev) => !prev);

  const handleImageClick = (tag: string) => setTag(tag);

  return {
    tag,
    setTag,
    groupByTag,
    state,
    handleLoad,
    handleClear,
    handleGroupByTag,
    handleImageClick,
  };
};
