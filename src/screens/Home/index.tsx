import { Header } from '@components/Header';
import { Search } from '@components/Search';
import React from 'react';

import { Container } from './styles';

export function Home() {
  return (
    <Container>
      <Header />
      <Search />
    </Container>
  );
}
