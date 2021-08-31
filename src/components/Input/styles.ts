import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: ${RFValue(60)}px;
  background: ${({ theme }) => theme.colors.shape};

  border-radius: ${RFValue(6)}px;
`;

export const InputText = styled.TextInput.attrs({
  placeholderTextColor: '#999999',
  placeholder: 'Link',
})`
  flex: 1;
  font-size: ${RFValue(16)}px;
  padding-left: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.text};
`;
