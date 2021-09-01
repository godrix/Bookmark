import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  background: ${({ theme }) => theme.colors.shape};
  width: 100%;
  height: ${RFValue(45)}px;
  margin-bottom: ${RFValue(10)}px;
  padding: 0 ${RFValue(10)}px;

  border-radius: ${RFValue(8)}px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Emoji = styled.Text`
  font-size: ${RFValue(24)}px;
`;

export const LinkInfo = styled.View`
  flex: 1;
  margin-left: ${RFValue(18)}px;
`;

export const LinkTitle = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-weight: bold;
  font-size: ${RFValue(18)}px;
`;

export const LinkUrl = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: ${RFValue(11)}px;
  color: ${({ theme }) => theme.colors.gray};
`;
