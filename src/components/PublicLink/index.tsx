import { IBookmarkDTO } from '@interfaces/dto';
import React from 'react';
import { Image } from 'react-native';
import FastImage from 'react-native-fast-image';

import { RFValue } from 'react-native-responsive-fontsize';

import { Container, LinkInfo, LinkTitle, LinkUrl } from './styles';

interface IPrivateLink {
  data: IBookmarkDTO;
}

export function PublicLink({ data }: IPrivateLink) {
  return (
    <Container>
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
