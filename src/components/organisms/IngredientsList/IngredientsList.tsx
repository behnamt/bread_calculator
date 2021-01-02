import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IIngredient } from '../../../interfaces/Bread';
import Input from '../../atoms/Input/Input';
import Select from '../../atoms/Select/Select';

interface IIngredientItem extends IIngredient {
  id: number;
}

interface IIngredientsListProps {
  onChange(ingredients: IIngredient[]): void;
}

const measures = [
  { value: '', label: '' },
  { value: 'tbs', label: 'Tablespoon' },
  { value: 'ts', label: 'Teaspoon' },
  { value: 'cup', label: 'Cup' },
];

const items = [
  { value: '', label: '' },
  { value: 'flour-630', label: 'Flour 630' },
  { value: 'flour-440', label: 'Flour 440' },
  { value: 'sugar', label: 'Sugar' },
  { value: 'water', label: 'water' },
];

export const IngredientsList: React.FC<IIngredientsListProps> = (
  props: IIngredientsListProps,
) => {
  const { onChange } = props;
  const { t } = useTranslation('common');
  const [ingredients, setIngredients] = useState<IIngredientItem[]>([]);
  const [counter, setCounter] = useState<number>(0);

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      {
        id: counter,
        amount: 0,
        item: '',
        measure: '',
      },
    ]);
    setCounter(counter + 1);
  };

  const removeIngredient = (id: number) => {
    const newingredients = ingredients.filter(
      (ingredient) => ingredient.id !== id,
    );

    setIngredients(newingredients);
    onChange(newingredients);
  };

  const changeAmount = (amount: string, id: number) => {
    const newingredients = ingredients.map((ingredient) => {
      if (ingredient.id === id) {
        return { ...ingredient, amount: Number(amount) };
      }
      return ingredient;
    });
    setIngredients(newingredients);
    onChange(newingredients);
  };

  const changeValue = (value: string, id: number, key: string) => {
    const newingredients = ingredients.map((ingredient) => {
      if (ingredient.id === id) {
        return { ...ingredient, [key]: value };
      }
      return ingredient;
    });
    setIngredients(newingredients);
    onChange(newingredients);
  };

  useEffect(() => {
    addIngredient();
  }, []);

  return (
    <>
      <div className="flex justify-between">
        <label>{t('ingredients-list.label')}</label>
        <button
          onClick={addIngredient}
          type="button"
          className="bg-blue-300 w-8 h-8 mb-2"
        >
          +
        </button>
      </div>
      {ingredients.map((ingredient, index) => (
        <div key={ingredient.id} className="flex items-end mb-2">
          <div className="flex flex-grow justify-between">
            <div>
              <Select
                label={`${t('ingredients-list.item')} #${index}`}
                name={`item_${index}`}
                onChange={(value) => changeValue(value, ingredient.id, 'item')}
                options={items}
              />
            </div>
            <div>
              <Input
                type="number"
                name={`amount_${index}`}
                label={t('ingredients-list.amount')}
                onChange={(value) => changeAmount(value, ingredient.id)}
              />
            </div>
            <div>
              <Select
                label={t('ingredients-list.measure')}
                name={`measure_${index}`}
                onChange={
                  (value) => changeValue(value, ingredient.id, 'measure')
                  // eslint-disable-next-line react/jsx-curly-newline
                }
                options={measures}
              />
            </div>
          </div>
          <button
            onClick={() => removeIngredient(ingredient.id)}
            type="button"
            className="bg-red-100 w-8 h-8 ml-10"
          >
            -
          </button>
        </div>
      ))}
    </>
  );
};
