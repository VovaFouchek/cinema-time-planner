import Select from 'react-select';

import useMovies from '@hooks/useMovies';

export interface Option {
  readonly label: string;
  readonly value: string;
}

interface MoviesSelectProps {
  value?: Option;
  onChange: (value: Option) => void;
}

const MoviesSelect: React.FC<MoviesSelectProps> = ({ onChange, value }) => {
  const { getAllMoviesTitle } = useMovies();

  return (
    <div>
      <Select
        isClearable
        placeholder="Choose movie..."
        onChange={(newValue) => {
          onChange(newValue!);
        }}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary25: '#d0ceff',
            primary: '#7570ff',
          },
        })}
        options={getAllMoviesTitle()}
        value={value}
      />
    </div>
  );
};

export default MoviesSelect;
