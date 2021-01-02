import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Input from '../../atoms/Input/Input';

interface IName {
  value: string;
  id: number;
}

interface IAlternatenamesProps {
  onChange(names: string[]): void;
}

export const AlternateNames: React.FC<IAlternatenamesProps> = (
  props: IAlternatenamesProps,
) => {
  const { t } = useTranslation('common');
  const { onChange } = props;
  const [names, setNames] = useState<IName[]>([]);
  const [counter, setCounter] = useState<number>(1);

  const addName = () => {
    setNames([...names, { value: '', id: counter }]);
    setCounter(counter + 1);
  };

  const removeName = (id: number) => {
    const newNames = names.filter((item) => item.id !== id);
    setNames(newNames);
    onChange(newNames.map((item) => item.value));
  };

  useEffect(() => {
    addName();
  }, []);

  const changeName = (value: string, id: number) => {
    const newNames = names.map((item) => {
      if (item.id === id) {
        return { value, id };
      }
      return item;
    });
    setNames(newNames);
    onChange(newNames.map((item) => item.value));
  };

  return (
    <>
      <div className="flex justify-between">
        <label>{t('alternate-names.label')}</label>
        <button
          onClick={addName}
          type="button"
          className="bg-blue-300 w-8 h-8 mb-2"
        >
          +
        </button>
      </div>
      {names.map((item, index) => (
        <div key={item.id} className="flex items-end justify-between mb-2">
          <div>
            <Input
              name={`alt_name_${index}`}
              label={`#${index + 1}`}
              onChange={(value) => changeName(value, item.id)}
            />
          </div>
          <button
            onClick={() => removeName(item.id)}
            type="button"
            className="bg-red-100 w-8 h-8"
          >
            -
          </button>
        </div>
      ))}
    </>
  );
};
