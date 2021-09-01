import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { TypeButton } from '@components/TypeButton';
import { useStorage } from '@hooks/storage';
import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { View } from 'react-native';

import { Container, Form, Rest, TypeForm } from './styles';

export function Modal() {
  const { url4bookmark, setUrl4bookmark, createBookmark } = useStorage();
  const [selectedType, setSelectedType] = useState<'public' | 'private'>(
    'public',
  );

  function handleSubmit() {
    createBookmark(url4bookmark, selectedType === 'private');
    setUrl4bookmark('');
  }

  function handleTypeSelect(type: 'public' | 'private') {
    setSelectedType(type);
  }
  return (
    <Container
      animationType="slide"
      transparent={true}
      visible={!!url4bookmark}>
      <StatusBar backgroundColor="rgba(255, 205, 50, 0.2)" />
      <Rest />
      <Form>
        <Input
          value={url4bookmark}
          onChangeText={setUrl4bookmark}
          placeholder="URL"
        />
        <TypeForm>
          <TypeButton
            type="public"
            title={'Publico'}
            isActive={selectedType === 'public'}
            onPress={() => handleTypeSelect('public')}
          />
          <TypeButton
            type="private"
            title={'Privado'}
            isActive={selectedType === 'private'}
            onPress={() => handleTypeSelect('private')}
          />
        </TypeForm>
        <Button value="Salvar" onPress={handleSubmit} />
      </Form>
    </Container>
  );
}
