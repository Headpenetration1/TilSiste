import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { getAllChildren, checkInChild, checkOutChild, getChildrenForParent } from '../data/api';
import { useAuth } from '../context/AuthContext';
import { Avatar } from '../components';
import { colors } from '../theme';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');
const isLargeScreen = width > 900;

const CheckInOutScreen = ({ navigation }) => {
  const { isDark } = useTheme();
  const { t } = useTranslation();
  const { user } = useAuth();
  const [children, setChildren] = useState([]);
  const [recentAction, setRecentAction] = useState(null);
  const [loading, setLoading] = useState(true);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    loadChildren();
  }, []);

  useEffect(() => {
    if (recentAction) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.delay(2500),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => setRecentAction(null));
    }
  }, [recentAction]);

  const loadChildren = async () => {
    try {
      // RBAC: Foreldre ser kun sine egne barn
      let data;
      if (user?.role === 'parent') {
        data = await getChildrenForParent(user.email);
      } else {
        data = await getAllChildren();
      }
      setChildren(data);
    } catch (error) {
      console.error('Error loading children:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async (child) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('nb-NO', {
      hour: '2-digit',
      minute: '2-digit',
    });

    try {
      await checkInChild(child.id, user?.name);
      setRecentAction({
        childName: child.name,
        action: 'inn',
        time: timeString,
      });
      loadChildren();
    } catch (error) {
      console.error('Error checking in:', error);
    }
  };

  const handleCheckOut = async (child) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('nb-NO', {
      hour: '2-digit',
      minute: '2-digit',
    });

    try {
      await checkOutChild(child.id, user?.name);
      setRecentAction({
        childName: child.name,
        action: 'ut',
        time: timeString,
      });
      loadChildren();
    } catch (error) {
      console.error('Error checking out:', error);
    }
  };

  const notCheckedIn = children.filter((c) => !c.isCheckedIn);
  const checkedIn = children.filter((c) => c.isCheckedIn);

  const renderChildItem = ({ item, isCheckedInList }) => (
    <View style={styles.childCard}>
      <View style={styles.childInfo}>
        <Avatar
          initials={item.avatar}
          size="medium"
          variant={isCheckedInList ? 'success' : 'neutral'}
        />
        <View style={styles.childDetails}>
          <Text style={styles.childName}>{item.name}</Text>
          <Text style={styles.childMeta}>
            {item.age} år • {item.group}
          </Text>
        </View>
      </View>
      
      {isCheckedInList ? (
        <View style={styles.checkInInfo}>
          <View style={styles.timeTag}>
            <Ionicons name="time-outline" size={14} color={colors.success[600]} />
            <Text style={styles.timeText}>{item.checkedInAt}</Text>
          </View>
          <TouchableOpacity
            style={styles.checkOutButton}
            onPress={() => handleCheckOut(item)}
            activeOpacity={0.7}
          >
            <Text style={styles.checkOutButtonText}>Sjekk ut</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.checkInButton}
          onPress={() => handleCheckIn(item)}
          activeOpacity={0.7}
        >
          <Ionicons name="log-in-outline" size={18} color={colors.white} />
          <Text style={styles.checkInButtonText}>Sjekk inn</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderList = (data, title, subtitle, isCheckedInList, emptyIcon, emptyText) => (
    <View style={[styles.listContainer, isLargeScreen && styles.listContainerLarge]}>
      <View style={[
        styles.listHeader,
        isCheckedInList ? styles.listHeaderGreen : styles.listHeaderBlue
      ]}>
        <View style={styles.listHeaderLeft}>
          <View style={[
            styles.listHeaderIcon,
            isCheckedInList ? styles.listHeaderIconGreen : styles.listHeaderIconBlue
          ]}>
            <Ionicons 
              name={isCheckedInList ? 'checkmark-circle' : 'log-in'} 
              size={20} 
              color={isCheckedInList ? colors.success[600] : colors.primary[600]} 
            />
          </View>
          <View>
            <Text style={styles.listTitle}>{title}</Text>
            <Text style={styles.listSubtitle}>{subtitle}</Text>
          </View>
        </View>
        <View style={[
          styles.countBadge,
          isCheckedInList ? styles.countBadgeGreen : styles.countBadgeBlue
        ]}>
          <Text style={[
            styles.countText,
            isCheckedInList ? styles.countTextGreen : styles.countTextBlue
          ]}>
            {data.length}
          </Text>
        </View>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderChildItem({ item, isCheckedInList })}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIcon}>
              <Ionicons name={emptyIcon} size={32} color={colors.neutral[300]} />
            </View>
            <Text style={styles.emptyText}>{emptyText}</Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDark ? colors.dark.bg.primary : colors.neutral[50] }]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{t('checkInOut.title')}</Text>
          <Text style={styles.subtitle}>{t('checkInOut.subtitle')}</Text>
        </View>
        
        <View style={styles.statsRow}>
          <View style={[styles.statBadge, styles.statBadgeBlue]}>
            <Ionicons name="people" size={16} color={colors.primary[600]} />
            <Text style={[styles.statText, styles.statTextBlue]}>
              {children.length} totalt
            </Text>
          </View>
          <View style={[styles.statBadge, styles.statBadgeGreen]}>
            <Ionicons name="checkmark-circle" size={16} color={colors.success[600]} />
            <Text style={[styles.statText, styles.statTextGreen]}>
              {checkedIn.length} inne
            </Text>
          </View>
        </View>
      </View>

      {/* Success toast */}
      {recentAction && (
        <Animated.View style={[styles.toast, { opacity: fadeAnim }]}>
          <View style={styles.toastIcon}>
            <Ionicons name="checkmark" size={18} color={colors.white} />
          </View>
          <Text style={styles.toastText}>
            <Text style={styles.toastBold}>{recentAction.childName}</Text>
            {' '}ble sjekket {recentAction.action} kl. {recentAction.time}
          </Text>
        </Animated.View>
      )}

      {/* Split view */}
      <View style={styles.splitContainer}>
        {renderList(
          notCheckedIn,
          'Sjekk inn',
          `${notCheckedIn.length} venter`,
          false,
          'log-in-outline',
          'Alle barn er sjekket inn!'
        )}
        {renderList(
          checkedIn,
          'Inne nå',
          `${checkedIn.length} barn`,
          true,
          'checkmark-circle-outline',
          'Ingen barn er sjekket inn'
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  header: {
    flexDirection: isLargeScreen ? 'row' : 'column',
    justifyContent: 'space-between',
    alignItems: isLargeScreen ? 'center' : 'flex-start',
    padding: 24,
    paddingBottom: 16,
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.neutral[800],
  },
  subtitle: {
    fontSize: 14,
    color: colors.neutral[500],
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statBadgeBlue: {
    backgroundColor: colors.primary[50],
  },
  statBadgeGreen: {
    backgroundColor: colors.success[50],
  },
  statText: {
    fontSize: 14,
    fontWeight: '600',
  },
  statTextBlue: {
    color: colors.primary[700],
  },
  statTextGreen: {
    color: colors.success[700],
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.success[600],
    marginHorizontal: 24,
    marginBottom: 16,
    padding: 14,
    borderRadius: 12,
    gap: 12,
    shadowColor: colors.success[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  toastIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toastText: {
    flex: 1,
    fontSize: 14,
    color: colors.white,
  },
  toastBold: {
    fontWeight: '700',
  },
  splitContainer: {
    flex: 1,
    flexDirection: isLargeScreen ? 'row' : 'column',
    paddingHorizontal: 24,
    gap: 20,
    paddingBottom: 24,
  },
  listContainer: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  listContainerLarge: {
    maxWidth: '50%',
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
  },
  listHeaderBlue: {
    backgroundColor: colors.primary[50],
    borderBottomColor: colors.primary[100],
  },
  listHeaderGreen: {
    backgroundColor: colors.success[50],
    borderBottomColor: colors.success[100],
  },
  listHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  listHeaderIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listHeaderIconBlue: {
    backgroundColor: colors.primary[100],
  },
  listHeaderIconGreen: {
    backgroundColor: colors.success[100],
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.neutral[800],
  },
  listSubtitle: {
    fontSize: 13,
    color: colors.neutral[500],
    marginTop: 2,
  },
  countBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countBadgeBlue: {
    backgroundColor: colors.primary[100],
  },
  countBadgeGreen: {
    backgroundColor: colors.success[100],
  },
  countText: {
    fontSize: 16,
    fontWeight: '700',
  },
  countTextBlue: {
    color: colors.primary[700],
  },
  countTextGreen: {
    color: colors.success[700],
  },
  listContent: {
    padding: 12,
  },
  childCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    backgroundColor: colors.neutral[50],
    borderRadius: 14,
    marginBottom: 10,
  },
  childInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },
  childDetails: {
    flex: 1,
  },
  childName: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.neutral[800],
  },
  childMeta: {
    fontSize: 13,
    color: colors.neutral[500],
    marginTop: 2,
  },
  checkInInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  timeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.success[50],
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  timeText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.success[700],
  },
  checkInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.success[500],
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: colors.success[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  checkInButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
  checkOutButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.neutral[200],
    backgroundColor: colors.white,
  },
  checkOutButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.neutral[600],
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.neutral[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 14,
    color: colors.neutral[500],
    textAlign: 'center',
  },
});

export default CheckInOutScreen;