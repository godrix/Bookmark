import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, Title, Emoji } from './styles';

interface ITypeButton extends TouchableOpacityProps {
  title: string;
  type: 'private' | 'public';
  isActive: boolean;
  onPress: () => void;
}

export function TypeButton({ title, type, isActive, onPress }: ITypeButton) {
  return (
    <Container isActive={isActive} onPress={onPress}>
      <Emoji>{type === 'private' ? '🔒' : '🔓'}</Emoji>
      <Title>{title}</Title>
    </Container>
  );
}
