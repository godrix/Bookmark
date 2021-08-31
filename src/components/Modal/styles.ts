import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.Modal`
  flex: 1;
`;

export const Rest = styled.View`
  background: rgba(0, 0, 0, 0.7);
  flex: 4;
`;

export const Form = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 2;

  padding: ${RFValue(15)}px;
`;
