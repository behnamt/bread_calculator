import React, { useState } from 'react';
import { useOrbitDB } from '../../../context/orbit-db';
import Input from '../../atoms/Input/Input';

const BreadForm: React.FC = () => {
  const { DB } = useOrbitDB();

  const [name, setName] = useState<string>('');
  const [alt, setAlt] = useState<string>('');

  const onSubmit = () => DB!.put({ name, alt });

  return (
    <div className="mt-5 md:mt-0 md:col-span-2">
      {DB && (
        <form action="#" method="POST">
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <Input label="Name" name="name" onChange={setName} />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <Input label="Alt" name="alt" onChange={setAlt} />
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
