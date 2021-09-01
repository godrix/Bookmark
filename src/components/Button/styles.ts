import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  width: 100%;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 5px;
  align-items: center;
  padding: ${RFValue(14)}px;
`;

export const Label = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
  font-weight: bold;
`;
