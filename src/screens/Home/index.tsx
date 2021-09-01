import { Header } from '@components/Header';
import { Search } from '@components/Search';
import React, { useEffect, useCallback } from 'react';
import { useClipboard } from '@react-native-clipboard/clipboard';
import { useIsFocused } from '@react-navigation/native';
import ShareMenu, { ShareCallback } from 'react-native-share-menu';
import { Container, Wrapper } from './styles';
import { useStorage } from '@hooks/storage';
import { PrivateLink } from '@components/PrivateLink';
import { TouchableOpacity, Text, FlatList } from 'react-native';
import { PublicLink } from '@components/PublicLink';
import { Modal } from '@components/Modal';

export function Home() {
  const isFocused = useIsFocused();
  const { validUrl, bookmarks, createBookmark, setUrl4bookmark } = useStorage();
  const [clipboard] = useClipboard();

  useEffect(() => {
    function checkClipboard() {
      if (validUrl(clipboard)) {
        console.log('via:api clipboard', clipboard);
        setUrl4bookmark(clipboard);
      }
    }

    if (isFocused) {
      checkClipboard();
    }
  }, [clipboard, validUrl, isFocused, setUrl4bookmark]);

  const handleShare = useCallback<ShareCallback>(
    item => {
      if (!item) {
        return;
      }

      const { data } = item;

      console.log('via:api share', data);

      if (validUrl(data)) {
        setUrl4bookmark(data);
      }
    },
    [validUrl, setUrl4bookmark],
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
