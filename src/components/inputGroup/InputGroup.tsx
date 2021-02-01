import React from 'react';
import './InputGroup.scss';

interface Props {
  tag: string;
  setTag: React.Dispatch<React.SetStateAction<string>>;
  onLoad: () => Promise<any>;
  loading: boolean;
  onClear: () => void;
  error: Error | null;
  onGroup: () => void;
  isGrouped: boolean;
}

export const InputGroup: React.FC<Props> = ({
  tag,
  setTag,
  onLoad,
  loading,
  onClear,
  error,
  onGroup,
  isGrouped,
}) => {
  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onLoad();
  };

  return (
    <div className="row">
      <div className="col">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error.message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="main-input">
            <input
              type="text"
              name="tag"
              className="form-control mt-2"
              placeholder="Введите тег"
              value={tag}
              onChange={handleTagChange}
            />
            <div className="mt-2">
              <button className="btn btn-success" type="submit">
                {loading ? 'Загрузка...' : 'Загрузить'}
              </button>
              <button
                className="btn btn-danger"
                onClick={onClear}
                type="button"
              >
                Очистить
              </button>
              <button
                className="btn btn-primary"
                onClick={onGroup}
                type="button"
              >
                {isGrouped ? 'Разгруппировать' : 'Группировать'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
