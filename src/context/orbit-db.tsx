import React, { useState, PropsWithChildren, useCallback } from 'react';
import IPFS from 'ipfs';
import OrbitDB from 'orbit-db';
import { useAsync, AsyncState } from 'react-async';
import DocumentStore from 'orbit-db-docstore';
import { IBread } from '../interfaces/Bread';

interface IOrbitDBContext {
  db: DocumentStore<IBread> | null;
  isPending: boolean;
}

const orbitDBContext = React.createContext<IOrbitDBContext>({
  db: null,
  isPending: false,
});

const useOrbitDBProvider = (): any => {
  const { data: db, isPending }: AsyncState<any> = useAsync({
    promiseFn: useCallback(async () => {
      const ipfsOptions = { repo: process.env.REACT_APP_IPFS_DIR };
      const ipfs = await IPFS.create(ipfsOptions);
      const orbitdb = await OrbitDB.createInstance(ipfs);
      return orbitdb.docs(process.env.REACT_APP_ORBIT_DB_INSTANCE || '');
    }, []),
  });

  return {
    db,
    isPending,
  };
};

const OrbitDBProvider = ({ children }: PropsWithChildren<any>): any => {
  const orbitDB = useOrbitDBProvider();

  return (
    <orbitDBContext.Provider value={orbitDB}>
      {children}
    </orbitDBContext.Provider>
  );
};

export { OrbitDBProvider };
