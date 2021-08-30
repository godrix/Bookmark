import React from 'react';
import { BlurView } from '@react-native-community/blur';

import { Container, Emoji, LinkInfo, LinkTitle, LinkUrl } from './styles';

export function PrivateLink() {
  return (
    <Container>
      <Emoji>🌐</Emoji>
      <LinkInfo>
        <BlurView
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        />
        <LinkTitle>Google</LinkTitle>
        <LinkUrl>https://google.com</LinkUrl>
      </LinkInfo>
      <Emoji>🔒</Emoji>
    </Container>
  );
}
