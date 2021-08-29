import React, { createContext, useContext } from 'react';

interface IStorageContext {
  validUrl: (url: string) => boolean;
}

const StorageContext = createContext<IStorageContext>({} as IStorageContext);

const StorageProvider: React.FC = ({ children }) => {
  function validUrl(url: string) {
    return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(
      url,
    );
  }
  return (
    <StorageContext.Provider value={{ validUrl }}>
      {children}
    </StorageContext.Provider>
  );
};

function useStorage() {
  const context = useContext(StorageContext);

  return context;
}

export { StorageProvider, useStorage };
