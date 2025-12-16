import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Path, G, Defs, LinearGradient as SvgGradient, Stop, Ellipse } from 'react-native-svg';
import { colors } from '../theme';
import { useTheme } from '../context/ThemeContext';

const { width, height } = Dimensions.get('window');
const isLargeScreen = width > 768;

// Animated floating bubble - MORE VISIBLE
const FloatingBubble = ({ size, initialX, initialY, duration, delay, color = 'blue' }) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animateY = Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -25,
          duration: duration,
          useNativeDriver: true,
          delay: delay,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: duration,
          useNativeDriver: true,
        }),
      ])
    );

    const animateX = Animated.loop(
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: 12,
          duration: duration * 1.2,
          useNativeDriver: true,
          delay: delay + 200,
        }),
        Animated.timing(translateX, {
          toValue: -12,
          duration: duration * 1.2,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: 0,
          duration: duration * 0.6,
          useNativeDriver: true,
        }),
      ])
    );

    const animateScale = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.08,
          duration: duration * 0.9,
          useNativeDriver: true,
          delay: delay + 400,
        }),
        Animated.timing(scale, {
          toValue: 0.94,
          duration: duration * 0.9,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: duration * 0.4,
          useNativeDriver: true,
        }),
      ])
    );

    animateY.start();
    animateX.start();
    animateScale.start();

    return () => {
      animateY.stop();
      animateX.stop();
      animateScale.stop();
    };
  }, []);

  // More visible gradient colors
  const gradientColors = color === 'coral' 
    ? ['rgba(232, 90, 79, 0.35)', 'rgba(194, 58, 58, 0.25)']
    : ['rgba(91, 127, 250, 0.40)', 'rgba(67, 97, 238, 0.30)'];

  return (
    <Animated.View
      style={[
        styles.floatingBubble,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          left: initialX,
          top: initialY,
          transform: [
            { translateY },
            { translateX },
            { scale },
          ],
        },
      ]}
    >
      <LinearGradient
        colors={gradientColors}
        style={[styles.bubbleGradient, { borderRadius: size / 2 }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
    </Animated.View>
  );
};

// Professional SVG Logo - Girl with red pigtails (bouncing)
const MascotLogo = ({ size = 120 }) => {
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -6,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 1800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View style={{ transform: [{ translateY: bounceAnim }] }}>
      <Svg width={size} height={size} viewBox="0 0 120 120">
        <Defs>
          <SvgGradient id="bgGradMain" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#5B7FFA" />
            <Stop offset="100%" stopColor="#4361EE" />
          </SvgGradient>
          <SvgGradient id="hairGradMain" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#E85A4F" />
            <Stop offset="50%" stopColor="#D64545" />
            <Stop offset="100%" stopColor="#C23A3A" />
          </SvgGradient>
          <SvgGradient id="faceGradMain" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#FFEDDE" />
            <Stop offset="100%" stopColor="#FFE0C8" />
          </SvgGradient>
          <SvgGradient id="ribbonGradMain" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#FFD93D" />
            <Stop offset="100%" stopColor="#F5B800" />
          </SvgGradient>
        </Defs>

        <Circle cx="60" cy="60" r="56" fill="url(#bgGradMain)" />
        <Circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />

        {/* Left pigtail */}
        <G>
          <Ellipse cx="22" cy="52" rx="12" ry="18" fill="url(#hairGradMain)" />
          <Ellipse cx="22" cy="52" rx="10" ry="15" fill="url(#hairGradMain)" opacity="0.8" />
          <Circle cx="22" cy="34" r="6" fill="url(#ribbonGradMain)" />
          <Circle cx="22" cy="34" r="4" fill="#FFE566" />
          <Path d="M18 38 Q14 45 16 52" stroke="#F5B800" strokeWidth="3" fill="none" strokeLinecap="round" />
          <Path d="M26 38 Q30 45 28 52" stroke="#F5B800" strokeWidth="3" fill="none" strokeLinecap="round" />
        </G>

        {/* Right pigtail */}
        <G>
          <Ellipse cx="98" cy="52" rx="12" ry="18" fill="url(#hairGradMain)" />
          <Ellipse cx="98" cy="52" rx="10" ry="15" fill="url(#hairGradMain)" opacity="0.8" />
          <Circle cx="98" cy="34" r="6" fill="url(#ribbonGradMain)" />
          <Circle cx="98" cy="34" r="4" fill="#FFE566" />
          <Path d="M94 38 Q90 45 92 52" stroke="#F5B800" strokeWidth="3" fill="none" strokeLinecap="round" />
          <Path d="M102 38 Q106 45 104 52" stroke="#F5B800" strokeWidth="3" fill="none" strokeLinecap="round" />
        </G>

        {/* Hair top/bangs */}
        <Path d="M32 48 Q35 22 60 18 Q85 22 88 48 Q82 35 60 30 Q38 35 32 48" fill="url(#hairGradMain)" />
        <Path d="M32 48 Q28 55 32 68 L38 64 Q35 55 38 48 Z" fill="url(#hairGradMain)" />
        <Path d="M88 48 Q92 55 88 68 L82 64 Q85 55 82 48 Z" fill="url(#hairGradMain)" />

        {/* Face */}
        <Circle cx="60" cy="60" r="26" fill="url(#faceGradMain)" />
        <Ellipse cx="52" cy="52" rx="12" ry="8" fill="rgba(255,255,255,0.3)" />

        {/* Bangs detail */}
        <Path d="M40 50 Q45 38 60 36 Q75 38 80 50 Q72 45 60 42 Q48 45 40 50" fill="url(#hairGradMain)" />

        {/* Eyes */}
        <G>
          <Ellipse cx="50" cy="58" rx="7" ry="8" fill="white" />
          <Circle cx="50" cy="59" r="5" fill="#2D3748" />
          <Circle cx="50" cy="59" r="2.5" fill="#1A202C" />
          <Circle cx="52" cy="57" r="2" fill="white" />
          <Circle cx="48" cy="61" r="1" fill="white" opacity="0.5" />
          
          <Ellipse cx="70" cy="58" rx="7" ry="8" fill="white" />
          <Circle cx="70" cy="59" r="5" fill="#2D3748" />
          <Circle cx="70" cy="59" r="2.5" fill="#1A202C" />
          <Circle cx="72" cy="57" r="2" fill="white" />
          <Circle cx="68" cy="61" r="1" fill="white" opacity="0.5" />
        </G>

        {/* Eyebrows */}
        <Path d="M44 50 Q50 48 54 50" stroke="#C23A3A" strokeWidth="2" fill="none" strokeLinecap="round" />
        <Path d="M66 50 Q70 48 76 50" stroke="#C23A3A" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Blush */}
        <Ellipse cx="42" cy="68" rx="6" ry="4" fill="#FFB6B6" opacity="0.5" />
        <Ellipse cx="78" cy="68" rx="6" ry="4" fill="#FFB6B6" opacity="0.5" />

        {/* Nose */}
        <Path d="M60 62 L58 68 L62 68" fill="none" stroke="#E8C4B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        {/* Smile */}
        <Path d="M52 74 Q60 82 68 74" fill="none" stroke="#E85A4F" strokeWidth="3" strokeLinecap="round" />
        <Path d="M54 75 Q60 80 66 75" fill="white" opacity="0.8" />

        {/* Freckles */}
        <Circle cx="45" cy="64" r="1" fill="#E8A090" opacity="0.6" />
        <Circle cx="48" cy="66" r="1" fill="#E8A090" opacity="0.6" />
        <Circle cx="72" cy="64" r="1" fill="#E8A090" opacity="0.6" />
        <Circle cx="75" cy="66" r="1" fill="#E8A090" opacity="0.6" />
      </Svg>
    </Animated.View>
  );
};

// Small logo for header/footer
const SmallLogo = ({ size = 42 }) => (
  <Svg width={size} height={size} viewBox="0 0 120 120">
    <Defs>
      <SvgGradient id="bgGradSmall" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#5B7FFA" />
        <Stop offset="100%" stopColor="#4361EE" />
      </SvgGradient>
      <SvgGradient id="hairGradSmall" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#E85A4F" />
        <Stop offset="100%" stopColor="#C23A3A" />
      </SvgGradient>
    </Defs>
    <Circle cx="60" cy="60" r="56" fill="url(#bgGradSmall)" />
    <Ellipse cx="22" cy="52" rx="10" ry="16" fill="url(#hairGradSmall)" />
    <Circle cx="22" cy="36" r="5" fill="#FFD93D" />
    <Ellipse cx="98" cy="52" rx="10" ry="16" fill="url(#hairGradSmall)" />
    <Circle cx="98" cy="36" r="5" fill="#FFD93D" />
    <Path d="M32 48 Q35 22 60 18 Q85 22 88 48 Q82 35 60 30 Q38 35 32 48" fill="url(#hairGradSmall)" />
    <Circle cx="60" cy="60" r="26" fill="#FFEDDE" />
    <Path d="M40 50 Q45 38 60 36 Q75 38 80 50 Q72 45 60 42 Q48 45 40 50" fill="url(#hairGradSmall)" />
    <Circle cx="50" cy="59" r="4" fill="#2D3748" />
    <Circle cx="70" cy="59" r="4" fill="#2D3748" />
    <Circle cx="51.5" cy="57.5" r="1.5" fill="white" />
    <Circle cx="71.5" cy="57.5" r="1.5" fill="white" />
    <Path d="M52 74 Q60 82 68 74" fill="none" stroke="#E85A4F" strokeWidth="3" strokeLinecap="round" />
  </Svg>
);

const LandingScreen = ({ navigation }) => {
  const { isDark } = useTheme();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const features = [
    {
      icon: 'flash',
      color: colors.primary[500],
      bgColor: colors.primary[50],
      title: t('features.quickCheckIn'),
      description: t('features.quickCheckInDesc'),
    },
    {
      icon: 'shield-checkmark',
      color: colors.success[500],
      bgColor: colors.success[50],
      title: t('features.secure'),
      description: t('features.secureDesc'),
    },
    {
      icon: 'phone-portrait',
      color: colors.purple[500],
      bgColor: colors.purple[50],
      title: t('features.everywhere'),
      description: t('features.everywhereDesc'),
    },
    {
      icon: 'people',
      color: colors.warning[500],
      bgColor: colors.warning[50],
      title: t('features.overview'),
      description: t('features.overviewDesc'),
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: isDark ? colors.dark.bg.primary : colors.white }]}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
          <View style={styles.headerLogo}>
            <SmallLogo size={42} />
            <Text style={styles.headerTitle}>Henteklar</Text>
          </View>
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.8}
          >
            <Text style={styles.loginButtonText}>{t('login')}</Text>
            <Ionicons name="arrow-forward" size={18} color={colors.white} />
          </TouchableOpacity>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <LinearGradient
            colors={[colors.primary[50], '#f0f4ff', colors.white]}
            style={styles.heroGradient}
          >
            {/* Animated floating bubbles - MORE VISIBLE */}
            <FloatingBubble size={260} initialX={-70} initialY={-50} duration={4000} delay={0} color="blue" />
            <FloatingBubble size={180} initialX={width - 100} initialY={-30} duration={5000} delay={500} color="blue" />
            <FloatingBubble size={140} initialX={width - 160} initialY={180} duration={3500} delay={1000} color="coral" />
            <FloatingBubble size={100} initialX={30} initialY={260} duration={4500} delay={300} color="coral" />
            <FloatingBubble size={120} initialX={width / 2 - 60} initialY={-80} duration={5500} delay={800} color="blue" />
            <FloatingBubble size={80} initialX={70} initialY={130} duration={3000} delay={1200} color="blue" />
            <FloatingBubble size={60} initialX={width - 90} initialY={100} duration={3800} delay={600} color="coral" />
            
            <Animated.View 
              style={[
                styles.heroContent,
                {
                  opacity: fadeAnim,
                  transform: [
                    { translateY: slideAnim },
                    { scale: scaleAnim },
                  ],
                },
              ]}
            >
              {/* Mascot with glow */}
              <View style={styles.mascotContainer}>
                <View style={styles.mascotGlow} />
                <View style={styles.mascotGlowInner} />
                <MascotLogo size={isLargeScreen ? 160 : 140} />
              </View>

              {/* Badge - NO EMOJI */}
              <View style={styles.tagline}>
                <Ionicons name="sparkles" size={16} color={colors.primary[600]} />
                <Text style={styles.taglineText}>{t('landing.tagline')}</Text>
              </View>

              {/* Title */}
              <Text style={styles.heroTitle}>
                {t('landing.title')}{'\n'}
                <Text style={styles.heroHighlight}>{t('landing.titleHighlight')}</Text>
              </Text>

              {/* Subtitle */}
              <Text style={styles.heroSubtitle}>{t('landing.subtitle')}</Text>

              {/* CTA Button */}
              <TouchableOpacity 
                style={styles.primaryCta}
                onPress={() => navigation.navigate('Login')}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={[colors.primary[500], colors.primary[600]]}
                  style={styles.primaryCtaGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.primaryCtaText}>{t('landing.getStarted')}</Text>
                  <View style={styles.ctaIconContainer}>
                    <Ionicons name="arrow-forward" size={20} color={colors.white} />
                  </View>
                </LinearGradient>
              </TouchableOpacity>

              {/* Trust badges */}
              <View style={styles.trustBadges}>
                <View style={styles.trustBadge}>
                  <View style={[styles.trustBadgeIcon, { backgroundColor: colors.success[50] }]}>
                    <Ionicons name="shield-checkmark" size={16} color={colors.success[500]} />
                  </View>
                  <Text style={styles.trustBadgeText}>GDPR-godkjent</Text>
                </View>
                <View style={styles.trustBadgeDivider} />
                <View style={styles.trustBadge}>
                  <View style={[styles.trustBadgeIcon, { backgroundColor: colors.primary[50] }]}>
                    <Ionicons name="lock-closed" size={16} color={colors.primary[500]} />
                  </View>
                  <Text style={styles.trustBadgeText}>Sikker lagring</Text>
                </View>
              </View>
            </Animated.View>
          </LinearGradient>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <View style={styles.featuresSectionHeader}>
            <Text style={styles.featuresSectionTitle}>{t('landing.featuresTitle')}</Text>
            <Text style={styles.featuresSectionSubtitle}>{t('landing.featuresSubtitle')}</Text>
          </View>

          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.featureCard}
                activeOpacity={0.9}
              >
                <View style={[styles.featureIcon, { backgroundColor: feature.bgColor }]}>
                  <Ionicons name={feature.icon} size={28} color={feature.color} />
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDesc}>{feature.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <LinearGradient
            colors={[colors.primary[500], colors.primary[600], colors.primary[700]]}
            style={styles.ctaCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <FloatingBubble size={180} initialX={-50} initialY={-50} duration={6000} delay={0} color="blue" />
            <FloatingBubble size={120} initialX={width - 140} initialY={-20} duration={5000} delay={500} color="blue" />
            
            <View style={styles.ctaCardContent}>
              <Text style={styles.ctaCardTitle}>{t('landing.ctaTitle')}</Text>
              <Text style={styles.ctaCardSubtitle}>{t('landing.ctaSubtitle')}</Text>
              <TouchableOpacity 
                style={styles.ctaCardButton}
                onPress={() => navigation.navigate('Login')}
                activeOpacity={0.8}
              >
                <Text style={styles.ctaCardButtonText}>{t('landing.loginNow')}</Text>
                <Ionicons name="arrow-forward" size={18} color={colors.primary[600]} />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerLogo}>
            <SmallLogo size={32} />
            <Text style={styles.footerTitle}>Henteklar</Text>
          </View>
          <Text style={styles.footerText}>{t('landing.copyright')}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 16,
    backgroundColor: colors.white,
    zIndex: 10,
  },
  headerLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary[600],
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.primary[500],
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: colors.primary[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.white,
  },
  heroSection: {
    marginBottom: 48,
  },
  heroGradient: {
    paddingVertical: 48,
    position: 'relative',
    overflow: 'hidden',
    minHeight: 520,
  },
  floatingBubble: {
    position: 'absolute',
    overflow: 'hidden',
  },
  bubbleGradient: {
    flex: 1,
  },
  heroContent: {
    alignItems: 'center',
    paddingHorizontal: 24,
    zIndex: 10,
  },
  mascotContainer: {
    position: 'relative',
    marginBottom: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mascotGlow: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.primary[200],
    opacity: 0.3,
  },
  mascotGlowInner: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: colors.primary[300],
    opacity: 0.2,
  },
  tagline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 28,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: colors.primary[100],
  },
  taglineText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary[700],
  },
  heroTitle: {
    fontSize: isLargeScreen ? 52 : 36,
    fontWeight: '800',
    color: colors.neutral[800],
    textAlign: 'center',
    lineHeight: isLargeScreen ? 62 : 44,
    marginBottom: 18,
    letterSpacing: -0.5,
  },
  heroHighlight: {
    color: colors.primary[500],
  },
  heroSubtitle: {
    fontSize: 17,
    color: colors.neutral[600],
    textAlign: 'center',
    maxWidth: 480,
    lineHeight: 26,
    marginBottom: 36,
    paddingHorizontal: 16,
  },
  primaryCta: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: colors.primary[900],
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    marginBottom: 36,
  },
  primaryCtaGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingLeft: 32,
    paddingRight: 8,
    paddingVertical: 8,
  },
  primaryCtaText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
  },
  ctaIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trustBadges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  trustBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  trustBadgeIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trustBadgeDivider: {
    width: 1,
    height: 24,
    backgroundColor: colors.neutral[200],
  },
  trustBadgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.neutral[700],
  },
  featuresSection: {
    paddingHorizontal: 24,
    marginBottom: 48,
  },
  featuresSectionHeader: {
    alignItems: 'center',
    marginBottom: 36,
  },
  featuresSectionTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.neutral[800],
    textAlign: 'center',
    marginBottom: 14,
    letterSpacing: -0.3,
  },
  featuresSectionSubtitle: {
    fontSize: 16,
    color: colors.neutral[500],
    textAlign: 'center',
    maxWidth: 400,
    lineHeight: 24,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
  },
  featureCard: {
    width: isLargeScreen ? '46%' : '100%',
    maxWidth: 360,
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 28,
    borderWidth: 1,
    borderColor: colors.neutral[100],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 2,
  },
  featureIcon: {
    width: 60,
    height: 60,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  featureTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: colors.neutral[800],
    marginBottom: 10,
  },
  featureDesc: {
    fontSize: 15,
    color: colors.neutral[600],
    lineHeight: 24,
  },
  ctaSection: {
    paddingHorizontal: 24,
    marginBottom: 48,
  },
  ctaCard: {
    borderRadius: 32,
    padding: 48,
    overflow: 'hidden',
    position: 'relative',
  },
  ctaCardContent: {
    alignItems: 'center',
    zIndex: 10,
  },
  ctaCardTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 14,
    letterSpacing: -0.3,
  },
  ctaCardSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  ctaCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.white,
    paddingHorizontal: 32,
    paddingVertical: 18,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  ctaCardButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.primary[600],
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 28,
    borderTopWidth: 1,
    borderTopColor: colors.neutral[100],
  },
  footerLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  footerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary[600],
  },
  footerText: {
    fontSize: 13,
    color: colors.neutral[400],
  },
});

export default LandingScreen;