import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';
import { useTheme } from '../context/ThemeContext';

const Input = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  autoComplete,
  icon,
  error,
  style,
  inputStyle,
}) => {
  const { isDark } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputFocused,
          error && styles.inputError,
          isDark && {
            backgroundColor: colors.dark.bg.tertiary,
            borderColor: error ? colors.dark.danger.default : colors.dark.border.default,
          },
        ]}
      >
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <TextInput
          style={[
            styles.input,
            icon && styles.inputWithIcon,
            inputStyle,
            isDark && { color: colors.dark.text.primary },
          ]}
          placeholder={placeholder}
          placeholderTextColor={isDark ? colors.dark.text.muted : colors.neutral[400]}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.neutral[700],
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    borderRadius: 12,
    overflow: 'hidden',
  },
  inputFocused: {
    borderColor: colors.primary[400],
    borderWidth: 2,
  },
  inputError: {
    borderColor: colors.red[500],
  },
  iconContainer: {
    paddingLeft: 16,
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.neutral[800],
  },
  inputWithIcon: {
    paddingLeft: 12,
  },
  errorText: {
    fontSize: 14,
    color: colors.red[600],
    marginTop: 4,
  },
});

export default Input;