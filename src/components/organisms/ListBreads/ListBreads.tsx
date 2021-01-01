import React, { useCallback } from 'react';
import { AsyncState, useAsync } from 'react-async';
import { useOrbitDB } from '../../../context/orbit-db';
import { IBread } from '../../../interfaces/Bread';

const ListBreads: React.FC = () => {
  const { DB } = useOrbitDB();

  const { data: allBreads }: AsyncState<IBread[]> = useAsync({
    promiseFn: useCallback(async () => DB!.get(''), [DB]),
    onReject: (e) => console.debug(e),
  });

  return (
    <div className="mt-5 md:mt-0 md:col-span-2">
      {allBreads?.map((bread) => (
        <div key={bread.name}>
          <span>{bread.name}</span>
          <span>{bread.alt}</span>
        </div>
      ))}
    </div>
  );
};

export default ListBreads;
