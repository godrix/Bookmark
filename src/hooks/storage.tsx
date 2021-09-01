import { API_SHORTEN } from '@env';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import { OpenGraphParser } from 'react-native-opengraph-kit';
import { IBookmarkDTO } from '@interfaces/dto';
import { features } from 'node:process';

interface IStorageContext {
  validUrl: (url: string) => boolean;
  createBookmark: (uri: string, incognito?: boolean) => Promise<void>;
  bookmarks: IBookmarkDTO[] | null;
  url4bookmark: string;
  setUrl4bookmark: (uri: string) => void;
}

const StorageContext = createContext<IStorageContext>({} as IStorageContext);

const StorageProvider: React.FC = ({ children }) => {
  const [bookmarks, setBookMarks] = useState<IBookmarkDTO[] | null>(null);
  const [url4bookmark, setUrl4bookmark] = useState('');

  const validUrl = useCallback((url: string) => {
    return /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(
      url,
    );
  }, []);

  const createBookmark = useCallback(
    async (uri: string, incognito: boolean = false) => {
      console.log('criando bookmark');
      try {
        if (!validUrl(uri)) {
          throw new Error('URI fornecida invalída!');
        }

        const repeatedUrl = bookmarks?.find(bookmark => bookmark.url === uri);

        if (repeatedUrl) {
          throw new Error('URL já está salva no seu Bookmark!');
        }
        const [data] = await OpenGraphParser.extractMeta(uri);

        const { url, hostname, site_name, image, title, description } = data;

        const jump = Math.floor(Math.random() * 100) + 1;

        const responsePost = await fetch(`${API_SHORTEN}${url}`);

        const { shorturl } = await responsePost.json();

        const id = String(uuid.v4());

        setBookMarks(
          prevState =>
            prevState && [
              {
                id,
                url,
                url_short: shorturl,
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
    },
    [validUrl, bookmarks],
  );

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
    <StorageContext.Provider
      value={{
        validUrl,
        createBookmark,
        bookmarks,
        url4bookmark,
        setUrl4bookmark,
      }}>
      {children}
    </StorageContext.Provider>
  );
};

function useStorage() {
  const context = useContext(StorageContext);

  return context;
}

export { StorageProvider, useStorage };
