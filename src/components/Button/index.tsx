import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, Label } from './styles';

interface IButtonProps extends TouchableOpacityProps {
  value: string;
  onPress: () => void;
}

export function Button({ value, onPress }: IButtonProps) {
  return (
    <Container onPress={onPress}>
      <Label>{value}</Label>
    </Container>
  );
}
