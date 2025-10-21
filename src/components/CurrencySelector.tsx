import React, { useState } from 'react';
import { TouchableOpacity, Keyboard } from 'react-native';
import { CurrencySelectorProps } from '../types/currency';
import { Flag, Code, Arrow, CurrencyRow } from '../styles/common';
import {
  SelectorWrapper,
  DropdownOverlay,
  Dropdown,
  DropdownItem,
} from '../styles/currencySelector';

const CurrencySelector = ({
  value,
  onChange,
  currencies,
}: CurrencySelectorProps) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleToggleDropdown = () => {
    Keyboard.dismiss();
    setShowDropdown(!showDropdown);
  };

  const handleSelectCurrency = (currency: typeof value) => {
    onChange(currency);
    setShowDropdown(false);
  };

  const handleCloseDropdown = () => {
    setShowDropdown(false);
  };

  return (
    <>
      {showDropdown && (
        <DropdownOverlay onPress={handleCloseDropdown} activeOpacity={1} />
      )}
      <SelectorWrapper>
        <TouchableOpacity onPress={handleToggleDropdown}>
          <CurrencyRow style={{ width: 'auto', marginBottom: 0 }}>
            <Flag>{value.flag}</Flag>
            <Code>{value.code}</Code>
            <Arrow>▼</Arrow>
          </CurrencyRow>
        </TouchableOpacity>
        {showDropdown && (
          <Dropdown
            showsVerticalScrollIndicator={true}
            nestedScrollEnabled={true}
          >
            {currencies.map(currency => (
              <DropdownItem
                key={currency.code}
                onPress={() => handleSelectCurrency(currency)}
              >
                <Flag>{currency.flag}</Flag>
                <Code>{currency.code}</Code>
              </DropdownItem>
            ))}
          </Dropdown>
        )}
      </SelectorWrapper>
    </>
  );
};

export default CurrencySelector;
