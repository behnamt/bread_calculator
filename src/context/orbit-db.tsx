import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react';
import IPFS from 'ipfs';
import OrbitDB from 'orbit-db';
import { useAsync, AsyncState } from 'react-async';
import DocumentStore from 'orbit-db-docstore';
import { IBread } from '../interfaces/Bread';

interface IOrbitDBContext {
  DB: DocumentStore<any> | null;
  isPending: boolean;
}

const orbitDBContext = React.createContext<IOrbitDBContext>({
  DB: null,
  isPending: false,
});

const useOrbitDB = (): any => useContext(orbitDBContext);

const useOrbitDBProvider = (): any => {
  const [DB, setDB] = useState<DocumentStore<any> | null>(null);

  const { isPending }: AsyncState<DocumentStore<any>> = useAsync({
    promiseFn: useCallback(async () => {
      const ipfsOptions = { repo: process.env.REACT_APP_IPFS_DIR };
      const ipfs = await IPFS.create(ipfsOptions);
      const orbitdb = await OrbitDB.createInstance(ipfs);
      const instance = await orbitdb.docs(
        process.env.REACT_APP_ORBIT_DB_INSTANCE || '',
        {
          indexBy: 'name',
        } as any,
      );
      instance.load();
      console.log('loaded');

      return instance;
    }, []),
    onResolve: (instance) => setDB(instance),
  });

  return {
    DB,
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

export { OrbitDBProvider, useOrbitDB };
