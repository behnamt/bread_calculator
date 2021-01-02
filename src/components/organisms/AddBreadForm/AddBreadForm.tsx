import React, { useCallback, useState } from 'react';
import { AsyncState, useAsync } from 'react-async';
import { useTranslation } from 'react-i18next';
import { useOrbitDB } from '../../../context/orbit-db';
import { IIngredient } from '../../../interfaces/Bread';
import { ISelectOption } from '../../../interfaces/Select';
import Input from '../../atoms/Input/Input';
import Select from '../../atoms/Select/Select';
import TextArea from '../../atoms/TextArea/TextArea';
import { AlternateNames } from '../AlternateNames/AlternateNames';
import { IngredientsList } from '../IngredientsList/IngredientsList';

const BreadForm: React.FC = () => {
  // Hooks
  const { DB } = useOrbitDB();
  const { t } = useTranslation('common');
  // State
  const [name, setName] = useState<string>('');
  const [alt, setAlt] = useState<string[]>([]);
  const [instructions, setInstruction] = useState<string>('');
  const [origin, setOrigin] = useState<string>('');
  const [ingredients, setIngredients] = useState<IIngredient[]>([]);

  const {
    isPending: isCountriesPending,
    data: allCountries,
  }: AsyncState<ISelectOption[]> = useAsync({
    promiseFn: useCallback(
      () =>
        fetch('https://restcountries.eu/rest/v2/all')
          .then((resp) => resp.json())
          .then((list) =>
            list.map((country: any) => ({
              value: country.alpha3Code,
              label: country.name,
            })),
          ),
      [],
    ),
  });

  const onSubmit = () =>
    DB?.put({ name, alt, ingredients, instructions, origin });

  return (
    <div className="mt-5 md:mt-0 md:col-span-2">
      {DB && (
        <form action="#" method="POST">
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <Input
                    label={t('bread-form.name')}
                    name="name"
                    onChange={setName}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  {isCountriesPending && <span>Loading...</span>}
                  {!isCountriesPending && (
                    <Select
                      label={t('bread-form.origin')}
                      name="origin"
                      onChange={setOrigin}
                      options={allCountries!}
                    />
                  )}
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <AlternateNames onChange={setAlt} />
                </div>
                <div className="col-start-1 col-end-7">
                  <IngredientsList onChange={setIngredients} />
                </div>
                <div className="col-start-1 col-end-7">
                  <TextArea
                    label={t('bread-form.instructions')}
                    name="instructions"
                    onChange={setInstruction}
                  />
                </div>
              </div>
              <button onClick={onSubmit} type="button">
                CLICK!
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default BreadForm;
