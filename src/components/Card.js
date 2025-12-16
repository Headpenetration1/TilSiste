import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { colors } from '../theme';
import { useTheme } from '../context/ThemeContext';

const Card = ({ children, style, variant = 'default', padding = true }) => {
  const { isDark } = useTheme();
  const getCardStyle = () => {
    const baseStyle = [styles.card];
    
    if (isDark) {
      baseStyle.push({
        backgroundColor: colors.dark.surface.default,
        borderColor: colors.dark.border.subtle,
      });
    }
    
    if (variant === 'hover') {
      baseStyle.push(styles.hover);
    }
    
    if (padding) {
      baseStyle.push(styles.padding);
    }
    
    return baseStyle;
  };

  return <View style={[...getCardStyle(), style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.neutral[100],
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
      },
    }),
  },
  hover: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 15,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
      },
    }),
  },
  padding: {
    padding: 16,
  },
});

export default Card;