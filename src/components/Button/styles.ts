import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: ${RFValue(60)}px;
  background: ${({ theme }) => theme.colors.primary};

  border-radius: ${RFValue(6)}px;

  margin: ${RFValue(10)}px 0;
`;
