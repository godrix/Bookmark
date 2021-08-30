import { Header } from '@components/Header';
import { Search } from '@components/Search';
import React, { useEffect, useCallback } from 'react';
import { useClipboard } from '@react-native-clipboard/clipboard';
import { useIsFocused } from '@react-navigation/native';
import ShareMenu, { ShareCallback } from 'react-native-share-menu';
import { Container, Wrapper } from './styles';
import { useStorage } from '@hooks/storage';
import { PrivateLink } from '@components/PrivateLink';
import { TouchableOpacity, Text } from 'react-native';

export function Home() {
  const isFocused = useIsFocused();
  const { validUrl, bookmarks, createBookmark } = useStorage();
  const [clipboard] = useClipboard();

  useEffect(() => {
    function checkClipboard() {
      if (validUrl(clipboard)) {
        alert(`${clipboard} é uma url para salvar?`);
      }
    }

    if (isFocused) {
      checkClipboard();
    }
  }, [clipboard, validUrl, isFocused]);

  const handleShare = useCallback<ShareCallback>(item => {
    if (!item) {
      return;
    }

    const { data } = item;
  }, []);

  useEffect(() => {
    ShareMenu.getInitialShare(handleShare);
  }, [handleShare]);

  useEffect(() => {
    const listener = ShareMenu.addNewShareListener(handleShare);

    return () => {
      listener.remove();
    };
  }, [handleShare]);

  function createBookmarkHandler(url: string) {
    createBookmark(url);
  }

  return (
    <Container>
      <Header />
      <Search />

      <Wrapper>
        {bookmarks?.map(bookmark => (
          <PrivateLink />
        ))}
      </Wrapper>
      <TouchableOpacity
        style={{
          width: 100,
          height: 100,
          backgroundColor: 'red',
          position: 'absolute',
        }}
        onPress={() => {
          createBookmarkHandler(
            'http://conteudoweb.itajai.sc.gov.br/setec-mobile/conectai/blob/development/src/contexts/Storage/index.tsx',
          );
        }}>
        <Text>cria um novo bookmark</Text>
      </TouchableOpacity>
    </Container>
  );
}
