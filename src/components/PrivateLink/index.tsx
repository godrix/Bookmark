import { IBookmarkDTO } from '@interfaces/dto';
import { cesarCipher } from '@utils/cesarCipher';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { Container, Emoji, LinkInfo, LinkTitle, LinkUrl } from './styles';

interface IPrivateLink {
  data: IBookmarkDTO;
}

export function PrivateLink({ data }: IPrivateLink) {
  const [modeIncognito, setModeIncognito] = useState(true);

  function handleIncognito() {
    setModeIncognito(!modeIncognito);
  }

  return (
    <Container>
      <Emoji>🌐</Emoji>
      <LinkInfo>
        <LinkTitle>
          {cesarCipher(data.title, modeIncognito ? data.jump : 0) ||
            cesarCipher(data.site_name, modeIncognito ? data.jump : 0)}
        </LinkTitle>
        <LinkUrl>
          {cesarCipher(data.url, modeIncognito ? data.jump : 0)}
        </LinkUrl>
      </LinkInfo>
      <TouchableOpacity onPress={handleIncognito}>
        <Emoji>{modeIncognito ? '🔒' : '🔓'}</Emoji>
      </TouchableOpacity>
    </Container>
  );
}
