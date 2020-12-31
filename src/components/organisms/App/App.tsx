import React from 'react';
import './App.scss';
import { useOrbitDB } from '../../../context/orbit-db';
import AddBreadForm from '../AddBreadForm/AddBreadForm';
import ListBreads from '../ListBreads/ListBreads';

const App = () => {
  const { DB, isPending } = useOrbitDB();

  return (
    <div className="app">
      {DB && (
        <main className="container mx-auto">
          <ListBreads />
          <AddBreadForm />
        </main>
      )}
      {isPending && <span>Loading ...</span>}
    </div>
  );
};

export default App;
