import React, { ReactElement, useCallback, useContext, useState } from 'react';
import IPFS from 'ipfs';
import OrbitDB from 'orbit-db';
import { useAsync, AsyncState } from 'react-async';
import DocumentStore from 'orbit-db-docstore';
import { IBread } from '../interfaces/Bread';

interface IOrbitDBContext {
  DB: DocumentStore<IBread> | null;
  isPending: boolean;
}

const ipfsOptions = {
  repo: process.env.REACT_APP_IPFS_DIR || './.ipfs',
  config: {
    Addresses: {
      Swarm: [
        // These are public webrtc-star servers
        '/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star',
        '/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star',
      ],
    },
    // This removes the default IPFS peers to dial to. You can specify any known addresses you wish, or leave blank.
    Bootstrap: [],
  },
};

const orbitDBContext = React.createContext<IOrbitDBContext>({
  DB: null,
  isPending: false,
});

const useOrbitDB = (): IOrbitDBContext => useContext(orbitDBContext);

const useOrbitDBProvider = (): IOrbitDBContext => {
  const [DB, setDB] = useState<DocumentStore<IBread> | null>(null);

  const { isPending }: AsyncState<DocumentStore<IBread>> = useAsync({
    promiseFn: useCallback(async () => {
      const ipfs = await IPFS.create(ipfsOptions as any);
      const orbitdb = await OrbitDB.createInstance(ipfs);

      const instance: DocumentStore<IBread> = await orbitdb.docs(
        process.env.REACT_APP_ORBIT_DB_INSTANCE || 'default-db',
        {
          accessController: {
            write: ['*'], // Give write access to everyone
          },
          indexBy: 'name',
        } as any,
      );

      await instance.load();

      return instance;
    }, []),
    onResolve: (instance) => setDB(instance),
  });

  return {
    DB,
    isPending,
  };
};

const OrbitDBProvider = ({ children }: any): ReactElement => {
  const orbitDB = useOrbitDBProvider();

  return (
    <orbitDBContext.Provider value={orbitDB}>
      {children}
    </orbitDBContext.Provider>
  );
};

export { OrbitDBProvider, useOrbitDB };
