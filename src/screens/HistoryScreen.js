import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getHistory, getChildrenByDate } from '../data/api';
import { Card, Avatar } from '../components';
import { colors } from '../theme';
import { useTheme } from '../context/ThemeContext';

const HistoryScreen = ({ navigation }) => {
  const { isDark } = useTheme();
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, [selectedDate]);

  const loadHistory = async () => {
    setLoading(true);
    try {
      const dateString = selectedDate.toISOString().split('T')[0];
      const historyData = await getHistory({ date: dateString });
      setHistory(historyData);
    } catch (error) {
      console.error('Error loading history:', error);
    } finally {
      setLoading(false);
    }
  };

  const onDateChange = (event, date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (date) {
      setSelectedDate(date);
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('nb-NO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('nb-NO', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getActionIcon = (action) => {
    switch (action) {
      case 'checkIn':
        return 'log-in-outline';
      case 'checkOut':
        return 'log-out-outline';
      case 'create':
        return 'add-circle-outline';
      case 'update':
        return 'create-outline';
      case 'delete':
        return 'trash-outline';
      default:
        return 'information-circle-outline';
    }
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'checkIn':
        return colors.success[600];
      case 'checkOut':
        return colors.red[600];
      case 'create':
        return colors.primary[600];
      case 'update':
        return colors.accent[600];
      case 'delete':
        return colors.neutral[600];
      default:
        return colors.neutral[500];
    }
  };

  const getActionText = (entry) => {
    switch (entry.action) {
      case 'checkIn':
        return t('history.checkedIn', { name: entry.childName, time: entry.time });
      case 'checkOut':
        return t('history.checkedOut', { name: entry.childName, time: entry.time });
      case 'create':
        return t('history.created', { name: entry.childName });
      case 'update':
        return t('history.updated', { name: entry.childName });
      case 'delete':
        return t('history.deleted', { name: entry.childName });
      default:
        return entry.action;
    }
  };

  const changeDate = (days) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const renderHistoryItem = ({ item }) => (
    <View style={styles.historyItem}>
      <View
        style={[
          styles.actionIconContainer,
          { backgroundColor: `${getActionColor(item.action)}20` },
        ]}
      >
        <Ionicons
          name={getActionIcon(item.action)}
          size={20}
          color={getActionColor(item.action)}
        />
      </View>
      <View style={styles.historyContent}>
        <Text style={styles.historyText}>{getActionText(item)}</Text>
        <Text style={styles.historyTime}>{formatTime(item.timestamp)}</Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDark ? colors.dark.bg.primary : colors.neutral[50] }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{t('history.title')}</Text>
      </View>

      {/* Date Selector */}
      <Card style={styles.dateCard}>
        <View style={styles.dateSelector}>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => changeDate(-1)}
          >
            <Ionicons name="chevron-back" size={24} color={colors.primary[600]} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.datePicker}
            onPress={() => setShowDatePicker(true)}
          >
            <Ionicons
              name="calendar-outline"
              size={20}
              color={colors.primary[600]}
            />
            <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => changeDate(1)}
          >
            <Ionicons
              name="chevron-forward"
              size={24}
              color={colors.primary[600]}
            />
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onDateChange}
            maximumDate={new Date()}
            locale="nb-NO"
          />
        )}
      </Card>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <View style={[styles.statIcon, { backgroundColor: colors.success[50] }]}>
            <Ionicons
              name="log-in-outline"
              size={20}
              color={colors.success[600]}
            />
          </View>
          <View>
            <Text style={styles.statValue}>
              {history.filter((h) => h.action === 'checkIn').length}
            </Text>
            <Text style={styles.statLabel}>{t('history.checkIns')}</Text>
          </View>
        </View>

        <View style={styles.statItem}>
          <View style={[styles.statIcon, { backgroundColor: colors.red[50] }]}>
            <Ionicons name="log-out-outline" size={20} color={colors.red[600]} />
          </View>
          <View>
            <Text style={styles.statValue}>
              {history.filter((h) => h.action === 'checkOut').length}
            </Text>
            <Text style={styles.statLabel}>{t('history.checkOuts')}</Text>
          </View>
        </View>
      </View>

      {/* History List */}
      <Card style={styles.historyCard} padding={false}>
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>{t('history.activities')}</Text>
          <Text style={styles.listCount}>
            {history.length} {t('history.events')}
          </Text>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>{t('loading')}</Text>
          </View>
        ) : history.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIcon}>
              <Ionicons name="time-outline" size={32} color={colors.neutral[400]} />
            </View>
            <Text style={styles.emptyText}>{t('history.noEvents')}</Text>
          </View>
        ) : (
          <FlatList
            data={history}
            keyExtractor={(item, index) => `${item.timestamp}-${index}`}
            renderItem={renderHistoryItem}
            style={styles.historyList}
            contentContainerStyle={styles.historyListContent}
          />
        )}
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.neutral[800],
  },
  dateCard: {
    marginBottom: 16,
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  datePicker: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.primary[50],
    borderRadius: 12,
    marginHorizontal: 12,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.primary[700],
    textTransform: 'capitalize',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.neutral[100],
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.neutral[800],
  },
  statLabel: {
    fontSize: 12,
    color: colors.neutral[500],
  },
  historyCard: {
    flex: 1,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.neutral[800],
  },
  listCount: {
    fontSize: 14,
    color: colors.neutral[500],
  },
  historyList: {
    flex: 1,
  },
  historyListContent: {
    padding: 4,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
    gap: 12,
  },
  actionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyContent: {
    flex: 1,
  },
  historyText: {
    fontSize: 14,
    color: colors.neutral[800],
    marginBottom: 2,
  },
  historyTime: {
    fontSize: 12,
    color: colors.neutral[500],
  },
  loadingContainer: {
    padding: 32,
    alignItems: 'center',
  },
  loadingText: {
    color: colors.neutral[500],
    fontSize: 16,
  },
  emptyContainer: {
    padding: 48,
    alignItems: 'center',
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
    color: colors.neutral[500],
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HistoryScreen;