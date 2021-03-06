import { IBookmarkDTO } from '@interfaces/dto';
import React from 'react';
import { Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useClipboard } from '@react-native-clipboard/clipboard';
import { RFValue } from 'react-native-responsive-fontsize';
import Snackbar from 'react-native-snackbar';

import { Container, LinkInfo, LinkTitle, LinkUrl } from './styles';

interface IPrivateLink {
  data: IBookmarkDTO;
}

export function PublicLink({ data }: IPrivateLink) {
  const [, setString] = useClipboard();

  function copyToClipboard() {
    setString(data.url);
    Snackbar.show({
      text: 'URL copiado para area de transferencia',
      duration: 2000,
    });
  }
  return (
    <Container onLongPress={copyToClipboard} delayLongPress={1000}>
      <FastImage
        source={{ uri: data.image }}
        style={{ width: RFValue(70), height: RFValue(90) }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <LinkInfo>
        <LinkTitle>{data.title}</LinkTitle>
        <LinkUrl>{data.url}</LinkUrl>
      </LinkInfo>
    </Container>
  );
}
