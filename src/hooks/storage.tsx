import { API_SHORTEN } from '@env';
import React, { createContext, useContext } from 'react';
import {
  OpenGraphAwareInput,
  OpenGraphDisplay,
  OpenGraphParser,
} from 'react-native-opengraph-kit';

interface IStorageContext {
  validUrl: (url: string) => boolean;
  createBookmark: (url: string) => Promise<void>;
}

const StorageContext = createContext<IStorageContext>({} as IStorageContext);

const StorageProvider: React.FC = ({ children }) => {
  function validUrl(url: string) {
    return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(
      url,
    );
  }

  async function createBookmark(uri: string, incognito: boolean = false) {
    try {
      const [data] = await OpenGraphParser.extractMeta(uri);

      const { url, hostname, site_name, image, title, description } = data;

      const jump = Math.floor(Math.random() * 100) + 1;

      const responsePost = await fetch(API_SHORTEN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
        }),
      });

      const { result_url } = await responsePost.json();

      console.log('🌤️', {
        url,
        url_short: result_url,
        hostname,
        site_name,
        image,
        title,
        description,
        jump,
        incognito,
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <StorageContext.Provider value={{ validUrl, createBookmark }}>
      {children}
    </StorageContext.Provider>
  );
};

function useStorage() {
  const context = useContext(StorageContext);

  return context;
}

export { StorageProvider, useStorage };
