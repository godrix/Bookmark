import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  background: ${({ theme }) => theme.colors.primary};
  height: ${RFValue(80)}px;
  align-items: center;
`;
