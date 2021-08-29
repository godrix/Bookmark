import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/AntDesign';
import { useTheme } from 'styled-components';
import { Container, Input } from './styles';

export function Search() {
  const { colors } = useTheme();
  return (
    <Container>
      <Input placeholder="Qual link voce procura?" />
      <Icon name="search1" size={RFValue(20)} color={colors.gray} />
    </Container>
  );
}
