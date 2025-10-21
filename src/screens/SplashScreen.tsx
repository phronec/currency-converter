import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

const SplashContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #5c78f4;
`;

const AppTitle = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: white;
  margin-bottom: 8px;
  text-align: center;
`;

const AppSubtitle = styled.Text`
  font-size: 16px;
  color: rgb(255, 255, 255);
  margin-bottom: 40px;
  text-align: center;
`;

const LoadingIndicator = styled(ActivityIndicator)`
  margin-top: 20px;
`;

const SplashScreen = () => {
  return (
    <SplashContainer>
      <AppTitle>Currency Exchange</AppTitle>
      <AppSubtitle>Live CNB Exchange Rates</AppSubtitle>
      <LoadingIndicator size="large" color="white" />
    </SplashContainer>
  );
};

export default SplashScreen;
