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
    <div>
      <button onClick={addName} type="button">
        +
      </button>
      {names.map((item) => (
        <div key={item.id} className="flex">
          <div>
            <Input
              name={`alt_name_${item.id}`}
              label={t('alternate-names.label')}
              onChange={(value) => changeName(value, item.id)}
            />
          </div>
          <button onClick={() => removeName(item.id)} type="button">
            -
          </button>
        </div>
      ))}
    </div>
  );
};
