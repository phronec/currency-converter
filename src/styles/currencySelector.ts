import styled from 'styled-components/native';

export const SelectorWrapper = styled.View`
  position: relative;
  flex-direction: row;
  align-items: center;
`;

export const DropdownOverlay = styled.TouchableOpacity`
  position: absolute;
  top: -1000px;
  left: -1000px;
  width: 3000px;
  height: 3000px;
  background-color: transparent;
  z-index: 999;
`;

export const Dropdown = styled.ScrollView`
  position: absolute;
  top: 50px;
  left: 0;
  background-color: #ffffff;
  border-radius: 10px;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 5px;
  elevation: 5;
  width: 150px;
  max-height: 200px;
  z-index: 1000;
`;

export const DropdownItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;
