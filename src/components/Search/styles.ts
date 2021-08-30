import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.shape};
  width: 90%;
  height: ${RFValue(50)}px;
  border-radius: ${RFValue(25)}px;

  position: absolute;
  top: ${RFValue(60)}px;
  margin-left: ${RFPercentage(3)}px;
  padding-right: ${RFValue(30)}px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  padding-left: ${RFValue(30)}px;
  max-width: ${RFPercentage(45)}px;
  color: ${({ theme }) => theme.colors.gray};
`;
