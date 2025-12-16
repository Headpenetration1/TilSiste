import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Path, G, Defs, LinearGradient, Stop, Ellipse } from 'react-native-svg';

// Profesjonell logo - Jente med musefletter og rødt hår
export const Logo = ({ size = 64, style }) => {
  const scale = size / 64;
  
  return (
    <View style={[{ width: size, height: size }, style]}>
      <Svg width={size} height={size} viewBox="0 0 64 64">
        <Defs>
          {/* Gradient for håret */}
          <LinearGradient id="hairGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#E85A4F" />
            <Stop offset="50%" stopColor="#D64545" />
            <Stop offset="100%" stopColor="#C23A3A" />
          </LinearGradient>
          
          {/* Gradient for ansiktet */}
          <LinearGradient id="faceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#FFE4D4" />
            <Stop offset="100%" stopColor="#FFDAB9" />
          </LinearGradient>
          
          {/* Gradient for bakgrunn */}
          <LinearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#3B82F6" />
            <Stop offset="100%" stopColor="#1D4ED8" />
          </LinearGradient>
        </Defs>
        
        {/* Bakgrunns sirkel */}
        <Circle cx="32" cy="32" r="30" fill="url(#bgGradient)" />
        
        {/* Musefletter - venstre */}
        <G>
          {/* Flette base */}
          <Ellipse cx="12" cy="28" rx="6" ry="8" fill="url(#hairGradient)" />
          {/* Flette linje */}
          <Path
            d="M12 20 Q8 28 12 36 Q16 28 12 20"
            fill="none"
            stroke="#B83030"
            strokeWidth="1"
          />
          {/* Hårstrikk */}
          <Circle cx="12" cy="20" r="3" fill="#FFD700" />
          <Circle cx="12" cy="36" r="2.5" fill="#FFD700" />
        </G>
        
        {/* Musefletter - høyre */}
        <G>
          {/* Flette base */}
          <Ellipse cx="52" cy="28" rx="6" ry="8" fill="url(#hairGradient)" />
          {/* Flette linje */}
          <Path
            d="M52 20 Q48 28 52 36 Q56 28 52 20"
            fill="none"
            stroke="#B83030"
            strokeWidth="1"
          />
          {/* Hårstrikk */}
          <Circle cx="52" cy="20" r="3" fill="#FFD700" />
          <Circle cx="52" cy="36" r="2.5" fill="#FFD700" />
        </G>
        
        {/* Hår topp */}
        <Path
          d="M18 24 Q20 12 32 10 Q44 12 46 24 Q44 18 32 16 Q20 18 18 24"
          fill="url(#hairGradient)"
        />
        
        {/* Hår sider */}
        <Path
          d="M18 24 Q16 28 18 34 L22 32 Q20 28 22 24 Z"
          fill="url(#hairGradient)"
        />
        <Path
          d="M46 24 Q48 28 46 34 L42 32 Q44 28 42 24 Z"
          fill="url(#hairGradient)"
        />
        
        {/* Ansikt */}
        <Circle cx="32" cy="32" r="14" fill="url(#faceGradient)" />
        
        {/* Pannelugg */}
        <Path
          d="M22 26 Q24 20 32 19 Q40 20 42 26 Q38 24 32 23 Q26 24 22 26"
          fill="url(#hairGradient)"
        />
        
        {/* Øyne */}
        <G>
          {/* Venstre øye */}
          <Ellipse cx="27" cy="31" rx="3" ry="3.5" fill="white" />
          <Circle cx="27" cy="31" r="2" fill="#2D3748" />
          <Circle cx="27.8" cy="30.2" r="0.8" fill="white" />
          
          {/* Høyre øye */}
          <Ellipse cx="37" cy="31" rx="3" ry="3.5" fill="white" />
          <Circle cx="37" cy="31" r="2" fill="#2D3748" />
          <Circle cx="37.8" cy="30.2" r="0.8" fill="white" />
        </G>
        
        {/* Kinn (blush) */}
        <Ellipse cx="23" cy="36" rx="3" ry="2" fill="#FFB6B6" opacity="0.6" />
        <Ellipse cx="41" cy="36" rx="3" ry="2" fill="#FFB6B6" opacity="0.6" />
        
        {/* Munn - glad smil */}
        <Path
          d="M28 38 Q32 42 36 38"
          fill="none"
          stroke="#D64545"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        
        {/* Nese */}
        <Path
          d="M32 33 L31 36 L33 36"
          fill="none"
          stroke="#E0C4B0"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

// Enkel logo variant (bare ikon uten bakgrunn)
export const LogoIcon = ({ size = 40, color = '#3B82F6', style }) => {
  return (
    <View style={[{ width: size, height: size }, style]}>
      <Svg width={size} height={size} viewBox="0 0 64 64">
        <Defs>
          <LinearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#E85A4F" />
            <Stop offset="100%" stopColor="#C23A3A" />
          </LinearGradient>
        </Defs>
        
        {/* Musefletter */}
        <Ellipse cx="12" cy="28" rx="5" ry="7" fill="url(#hairGrad)" />
        <Circle cx="12" cy="21" r="2.5" fill="#FFD700" />
        <Ellipse cx="52" cy="28" rx="5" ry="7" fill="url(#hairGrad)" />
        <Circle cx="52" cy="21" r="2.5" fill="#FFD700" />
        
        {/* Hår */}
        <Path
          d="M18 24 Q20 12 32 10 Q44 12 46 24 Q44 18 32 16 Q20 18 18 24"
          fill="url(#hairGrad)"
        />
        
        {/* Ansikt */}
        <Circle cx="32" cy="32" r="14" fill="#FFE4D4" />
        
        {/* Pannelugg */}
        <Path
          d="M22 26 Q24 20 32 19 Q40 20 42 26 Q38 24 32 23 Q26 24 22 26"
          fill="url(#hairGrad)"
        />
        
        {/* Øyne */}
        <Circle cx="27" cy="31" r="2" fill="#2D3748" />
        <Circle cx="37" cy="31" r="2" fill="#2D3748" />
        <Circle cx="27.6" cy="30.4" r="0.6" fill="white" />
        <Circle cx="37.6" cy="30.4" r="0.6" fill="white" />
        
        {/* Smil */}
        <Path
          d="M28 38 Q32 42 36 38"
          fill="none"
          stroke="#D64545"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
};

export default Logo;
