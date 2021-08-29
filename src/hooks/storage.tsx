import React, { createContext, useContext } from 'react';

interface IStorageContext {}

const StorageContext = createContext<IStorageContext>({} as IStorageContext);

const StorageProvider: React.FC = ({ children }) => {
  return (
    <StorageContext.Provider value={{}}>{children}</StorageContext.Provider>
  );
};

function useStorage() {
  const context = useContext(StorageContext);

  return context;
}

export { StorageProvider, useStorage };
