import React from 'react';
import { View } from 'react-native';

import { Container, Emoji, LinkInfo, LinkTitle, LinkUrl } from './styles';

export function PrivateLink() {
  return (
    <Container>
      <Emoji>🌐</Emoji>
      <LinkInfo>
        <LinkTitle>Google</LinkTitle>
        <LinkUrl>https://google.com</LinkUrl>
      </LinkInfo>
      <Emoji>🔒</Emoji>
    </Container>
  );
}
