import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacityProps } from 'react-native';

interface IType extends TouchableOpacityProps {
  isActive: boolean;
}

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})<IType>`
  width: 48%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${RFValue(16)}px;
  border-radius: 6px;
  ${({ isActive }) =>
    !isActive &&
    css`
      border: 1.5px solid ${({ theme }) => theme.colors.shape};
    `}

  ${({ isActive, theme }) =>
    isActive &&
    css`
      background-color: ${theme.colors.secundary_light};
      border: 1.5px solid ${theme.colors.primary};
    `}
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(16)}px;
  font-weight: bold;
  margin-left: ${RFValue(8)}px;
`;

export const Emoji = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-size: ${RFValue(18)}px;
`;
