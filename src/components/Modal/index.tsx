import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { useStorage } from '@hooks/storage';
import React from 'react';
import { StatusBar } from 'react-native';
import { View } from 'react-native';

import { Container, Form, Rest } from './styles';

export function Modal() {
  const { url4bookmark } = useStorage();
  return (
    <Container
      animationType="slide"
      transparent={true}
      visible={!!url4bookmark}>
      <StatusBar backgroundColor="rgba(255, 205, 50, 0.2)" />
      <Rest />
      <Form>
        <Input />
        <Button />
      </Form>
    </Container>
  );
}
