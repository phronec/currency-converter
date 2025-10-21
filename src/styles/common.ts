import styled from 'styled-components/native';

// Layout Components
export const Container = styled.View`
  flex: 1;
  background-color: #f0f4ff;
  padding: 20px;
  align-items: center;
  justify-content: flex-start;
  padding-top: 60px;
`;

export const CurrencyRow = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  margin-bottom: 10px;
`;

// Typography
export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #00008b;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const Subtitle = styled.Text`
  font-size: 14px;
  color: #808080;
  text-align: center;
  margin-bottom: 30px;
`;

export const Label = styled.Text`
  font-size: 14px;
  color: #808080;
  align-self: flex-start;
  margin-bottom: 5px;
`;

export const Flag = styled.Text`
  font-size: 24px;
  margin-right: 10px;
`;

export const Code = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px;
`;

export const Arrow = styled.Text`
  font-size: 18px;
  color: #808080;
`;

// Input Components
export const AmountInput = styled.TextInput`
  flex: 1;
  text-align: right;
  font-size: 18px;
  color: #000000;
`;

export const ConvertedAmount = styled.Text`
  flex: 1;
  text-align: right;
  font-size: 18px;
  color: #000000;
`;

// Button Components
export const SwapButton = styled.TouchableOpacity`
  background-color: #4169e1;
  border-radius: 20px;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
`;

export const SwapIcon = styled.Text`
  font-size: 18px;
  color: #ffffff;
`;

// Rate Display
export const RateContainer = styled.View`
  align-self: flex-start;
  margin-top: 20px;
`;

export const RateLabel = styled.Text`
  font-size: 14px;
  color: #808080;
  margin-bottom: 5px;
`;

export const RateText = styled.Text`
  font-size: 16px;
  color: #000000;
`;
