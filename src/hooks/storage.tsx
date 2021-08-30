import { API_SHORTEN } from '@env';
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { OpenGraphParser } from 'react-native-opengraph-kit';

interface IBookmarkDTO {
  url: string;
  url_short: string;
  hostname: string;
  site_name: string;
  image: string;
  title: string;
  description: string;
  jump: number;
  incognito: boolean;
}
interface IStorageContext {
  validUrl: (url: string) => boolean;
  createBookmark: (url: string) => Promise<void>;
  bookmarks: IBookmarkDTO[] | null;
}

const StorageContext = createContext<IStorageContext>({} as IStorageContext);

const StorageProvider: React.FC = ({ children }) => {
  const [bookmarks, setBookMarks] = useState<IBookmarkDTO[] | null>(null);
  function validUrl(url: string) {
    return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(
      url,
    );
  }

  async function createBookmark(uri: string, incognito: boolean = false) {
    try {
      if (!validUrl(uri)) {
        throw new Error('URI fornecida invalída!');
      }
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

      setBookMarks(
        prevState =>
          prevState && [
            {
              url,
              url_short: result_url,
              hostname,
              site_name,
              image,
              title,
              description,
              jump,
              incognito,
            },
            ...prevState,
          ],
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  useEffect(() => {
    if (bookmarks !== null) {
      AsyncStorage.setItem(
        '@bookmark:bookmarks',
        JSON.stringify(bookmarks),
      ).then();
      console.log('bookmark saved');
    }
  }, [bookmarks]);

  useEffect(() => {
    async function loadStorageData() {
      const bookMarkValue = await AsyncStorage.getItem('@bookmark:bookmarks');

      const bookmarkInitial =
        bookMarkValue !== null ? JSON.parse(bookMarkValue) : [];

      setBookMarks(bookmarkInitial);
    }
    loadStorageData();
  }, []);

  return (
    <StorageContext.Provider value={{ validUrl, createBookmark, bookmarks }}>
      {children}
    </StorageContext.Provider>
  );
};

function useStorage() {
  const context = useContext(StorageContext);

  return context;
}

export { StorageProvider, useStorage };
