import { Header } from '@components/Header';
import { Search } from '@components/Search';
import React, { useEffect, useCallback } from 'react';
import { useClipboard } from '@react-native-clipboard/clipboard';
import { useIsFocused } from '@react-navigation/native';
import ShareMenu, { ShareCallback } from 'react-native-share-menu';
import { Container, Wrapper } from './styles';
import { useStorage } from '@hooks/storage';
import { PrivateLink } from '@components/PrivateLink';
import { FlatList } from 'react-native';
import { PublicLink } from '@components/PublicLink';
import { Modal } from '@components/Modal';

export function Home() {
  const isFocused = useIsFocused();
  const { validUrl, bookmarks, setUrl4bookmark, isRepeted } = useStorage();
  const [clipboard] = useClipboard();

  useEffect(() => {
    function checkClipboard() {
      if (validUrl(clipboard)) {
        console.log('via:api clipboard', isRepeted(clipboard));
        if (!isRepeted(clipboard)) {
          setUrl4bookmark(clipboard);
        } else {
          setUrl4bookmark('');
        }
      }
    }

    if (isFocused) {
      checkClipboard();
    }
  }, [clipboard, validUrl, isFocused, setUrl4bookmark, isRepeted]);

  const handleShare = useCallback<ShareCallback>(
    item => {
      if (!item) {
        return;
      }

      const { data } = item;

      console.log('via:api share', data);

      if (validUrl(data)) {
        if (!isRepeted(data)) {
          setUrl4bookmark(data);
        } else {
          setUrl4bookmark('');
        }
      }
    },
    [validUrl, setUrl4bookmark, isRepeted],
  );

  useEffect(() => {
    ShareMenu.getInitialShare(handleShare);
  }, [handleShare]);

  useEffect(() => {
    const listener = ShareMenu.addNewShareListener(handleShare);

    return () => {
      listener.remove();
    };
  }, [handleShare]);

  return (
    <Container>
      <Header />
      <Search />
      <Wrapper>
        <FlatList
          data={bookmarks}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) =>
            item.incognito ? (
              <PrivateLink data={item} />
            ) : (
              <PublicLink data={item} />
            )
          }
        />
      </Wrapper>
      <Modal />
    </Container>
  );
}
