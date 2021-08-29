import { Header } from '@components/Header';
import { Search } from '@components/Search';
import React, { useState, useEffect, useCallback } from 'react';

import ShareMenu, { ShareCallback } from 'react-native-share-menu';
import { Container } from './styles';

type SharedItem = {
  mimeType: string;
  data: string;
  extraData: any;
};
export function Home() {
  const [sharedData, setSharedData] = useState<string | null>(null);

  const handleShare = useCallback<ShareCallback>(item => {
    if (!item) {
      return;
    }

    const { data } = item;

    setSharedData(data);
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
  return (
    <Container>
      <Header />
      <Search />
    </Container>
  );
}
