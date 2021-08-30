import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
`;

export const Wrapper = styled.View`
  margin-top: ${RFValue(30)}px;
  padding: ${RFValue(25)}px;
`;
