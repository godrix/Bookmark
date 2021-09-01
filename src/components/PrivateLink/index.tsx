import { IBookmarkDTO } from '@interfaces/dto';
import { useClipboard } from '@react-native-clipboard/clipboard';
import { cesarCipher } from '@utils/cesarCipher';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Snackbar from 'react-native-snackbar';

import { Container, Emoji, LinkInfo, LinkTitle, LinkUrl } from './styles';

interface IPrivateLink {
  data: IBookmarkDTO;
}

export function PrivateLink({ data }: IPrivateLink) {
  const [modeIncognito, setModeIncognito] = useState(true);

  const [, setString] = useClipboard();

  function copyToClipboard() {
    if (!modeIncognito) {
      setString(data.url);
      Snackbar.show({
        text: 'URL copiado para area de transferencia',
        duration: 2000,
      });
    }
  }

  function handleIncognito() {
    setModeIncognito(!modeIncognito);
  }

  return (
    <Container onLongPress={copyToClipboard} delayLongPress={1000}>
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
