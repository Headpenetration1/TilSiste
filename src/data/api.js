import AsyncStorage from '@react-native-async-storage/async-storage';
import { mockChildren as defaultChildren } from './mockData';

const STORAGE_KEY = '@henteklar_children_v1';
const HISTORY_KEY = '@henteklar_history_v1';
const USERS_KEY = '@henteklar_users_v1';
const CALENDAR_KEY = '@henteklar_calendar_v1';
const SETTINGS_KEY = '@henteklar_settings_v1';
const CHECKIN_LOG_KEY = '@henteklar_checkin_log_v1';

/**
 * API-modul for håndtering av barn-data, brukere, kalender og innstillinger
 */

// ====== Storage helpers ======

const loadChildren = async () => {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(defaultChildren));
      return defaultChildren;
    }
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error loading children:', error);
    return defaultChildren;
  }
};

const saveChildren = async (children) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(children));
  } catch (error) {
    console.error('Error saving children:', error);
  }
};

const saveToHistory = async (entry) => {
  try {
    const raw = await AsyncStorage.getItem(HISTORY_KEY);
    const history = raw ? JSON.parse(raw) : [];
    history.unshift({
      ...entry,
      timestamp: new Date().toISOString(),
    });
    const trimmed = history.slice(0, 100);
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
  } catch (error) {
    console.error('Error saving history:', error);
  }
};

// ====== Check-in/out logg med detaljerte tidspunkter ======

export const logCheckInOut = async (childId, childName, action, performedBy) => {
  try {
    const raw = await AsyncStorage.getItem(CHECKIN_LOG_KEY);
    const logs = raw ? JSON.parse(raw) : [];
    
    const now = new Date();
    const logEntry = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      childId,
      childName,
      action,
      timestamp: now.toISOString(),
      date: now.toISOString().split('T')[0],
      time: now.toLocaleTimeString('nb-NO', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      performedBy: performedBy || 'System',
    };
    
    logs.unshift(logEntry);
    const trimmed = logs.slice(0, 1000);
    await AsyncStorage.setItem(CHECKIN_LOG_KEY, JSON.stringify(trimmed));
    
    return logEntry;
  } catch (error) {
    console.error('Error logging check-in/out:', error);
    return null;
  }
};

export const getCheckInOutLogs = async (options = {}) => {
  try {
    const raw = await AsyncStorage.getItem(CHECKIN_LOG_KEY);
    if (!raw) return [];
    
    let logs = JSON.parse(raw);
    
    if (options.childId) {
      logs = logs.filter((log) => log.childId === options.childId);
    }
    
    if (options.date) {
      logs = logs.filter((log) => log.date === options.date);
    }
    
    if (options.startDate && options.endDate) {
      logs = logs.filter((log) => log.date >= options.startDate && log.date <= options.endDate);
    }
    
    if (options.limit) {
      logs = logs.slice(0, options.limit);
    }
    
    return logs;
  } catch (error) {
    console.error('Error loading check-in/out logs:', error);
    return [];
  }
};

// ====== Bruker-funksjoner ======

export const getAllUsers = async () => {
  try {
    const raw = await AsyncStorage.getItem(USERS_KEY);
    if (!raw) {
      const defaultUsers = [
        {
          id: 'u1',
          name: 'Anne Hansen',
          email: 'anne.hansen@barnehagen.no',
          phone: '912 34 567',
          role: 'admin',
          avatar: 'AH',
          createdAt: new Date().toISOString(),
        },
      ];
      await AsyncStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
      return defaultUsers;
    }
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error loading users:', error);
    return [];
  }
};

export const createUser = async (userData) => {
  try {
    const users = await getAllUsers();
    
    if (users.find((u) => u.email === userData.email)) {
      throw new Error('E-postadressen er allerede i bruk');
    }
    
    const newUser = {
      id: `u${Date.now()}`,
      name: userData.name,
      email: userData.email,
      phone: userData.phone || '',
      role: userData.role || 'staff',
      avatar: userData.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2),
      createdAt: new Date().toISOString(),
    };
    
    const updated = [...users, newUser];
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(updated));
    
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const updateUser = async (userId, updates) => {
  try {
    const users = await getAllUsers();
    const updated = users.map((user) =>
      user.id === userId
        ? {
            ...user,
            ...updates,
            avatar: updates.name
              ? updates.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()
                  .slice(0, 2)
              : user.avatar,
            updatedAt: new Date().toISOString(),
          }
        : user
    );
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(updated));
    return updated.find((u) => u.id === userId);
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const users = await getAllUsers();
    const user = users.find((u) => u.id === userId);
    
    if (!user) {
      throw new Error('Bruker ikke funnet');
    }
    
    const updatedUsers = users.filter((u) => u.id !== userId);
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
    
    const children = await loadChildren();
    const updatedChildren = children.map((child) => ({
      ...child,
      parents: (child.parents || []).filter((p) => p.userId !== userId),
    }));
    await saveChildren(updatedChildren);
    
    return { success: true, deletedUser: user };
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// Passord styrke-sjekk
export const validatePasswordStrength = (password) => {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
  
  const score = Object.values(checks).filter(Boolean).length;
  
  let strength = 'weak';
  let color = '#EF4444'; // red
  let label = 'Svak';
  
  if (score >= 4) {
    strength = 'strong';
    color = '#10B981'; // green
    label = 'Sterk';
  } else if (score >= 3) {
    strength = 'medium';
    color = '#F59E0B'; // amber
    label = 'Middels';
  }
  
  return {
    checks,
    score,
    strength,
    color,
    label,
    isValid: score >= 3, // Minimum middels styrke
  };
};

export const changePassword = async (userId, oldPassword, newPassword) => {
  try {
    if (!oldPassword || !newPassword) {
      throw new Error('Begge passord må fylles ut');
    }
    
    const validation = validatePasswordStrength(newPassword);
    if (!validation.isValid) {
      throw new Error('Passordet er for svakt. Bruk minst 8 tegn med store/små bokstaver og tall.');
    }
    
    // Simuler API-kall
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    return { success: true };
  } catch (error) {
    console.error('Error changing password:', error);
    throw error;
  }
};

// Glemt passord - send reset-lenke
export const requestPasswordReset = async (email) => {
  try {
    if (!email || !email.includes('@')) {
      throw new Error('Vennligst oppgi en gyldig e-postadresse');
    }
    
    // Sjekk om e-posten finnes
    const users = await getAllUsers();
    const userExists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
    
    // Simuler sending av e-post (alltid success for sikkerhet - ikke avslør om e-post finnes)
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    // Lagre reset-token (i en ekte app ville dette gått til serveren)
    const resetToken = Math.random().toString(36).substring(2, 15);
    const resetData = {
      email: email.toLowerCase(),
      token: resetToken,
      expires: new Date(Date.now() + 3600000).toISOString(), // 1 time
      createdAt: new Date().toISOString(),
    };
    
    // Lagre for demo-formål
    await AsyncStorage.setItem('@henteklar_password_reset', JSON.stringify(resetData));
    
    return { 
      success: true, 
      message: 'Hvis e-postadressen finnes i systemet, vil du motta en lenke for å tilbakestille passordet.' 
    };
  } catch (error) {
    console.error('Error requesting password reset:', error);
    throw error;
  }
};

// Verifiser reset-token og sett nytt passord
export const resetPasswordWithToken = async (token, newPassword) => {
  try {
    const raw = await AsyncStorage.getItem('@henteklar_password_reset');
    if (!raw) {
      throw new Error('Ugyldig eller utløpt lenke');
    }
    
    const resetData = JSON.parse(raw);
    
    if (resetData.token !== token) {
      throw new Error('Ugyldig token');
    }
    
    if (new Date(resetData.expires) < new Date()) {
      throw new Error('Lenken har utløpt. Vennligst be om en ny.');
    }
    
    const validation = validatePasswordStrength(newPassword);
    if (!validation.isValid) {
      throw new Error('Passordet er for svakt');
    }
    
    // Slett reset-token
    await AsyncStorage.removeItem('@henteklar_password_reset');
    
    return { success: true, message: 'Passordet er oppdatert' };
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};

// Hent barn for en spesifikk forelder (RBAC)
export const getChildrenForParent = async (parentEmail) => {
  try {
    const children = await loadChildren();
    
    // Filtrer barn der forelder har tilgang
    const filteredChildren = children.filter((child) => {
      if (!child.parents || child.parents.length === 0) return false;
      return child.parents.some(
        (parent) => parent.email?.toLowerCase() === parentEmail?.toLowerCase()
      );
    });
    
    return filteredChildren;
  } catch (error) {
    console.error('Error getting children for parent:', error);
    return [];
  }
};

// ====== Kalender-funksjoner ======

export const getCalendarEvents = async (options = {}) => {
  try {
    const raw = await AsyncStorage.getItem(CALENDAR_KEY);
    if (!raw) return [];
    
    let events = JSON.parse(raw);
    
    if (options.year && options.month !== undefined) {
      events = events.filter((event) => {
        const eventDate = new Date(event.date);
        return (
          eventDate.getFullYear() === options.year &&
          eventDate.getMonth() === options.month
        );
      });
    }
    
    if (options.date) {
      events = events.filter((event) => event.date === options.date);
    }
    
    events.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    return events;
  } catch (error) {
    console.error('Error loading calendar events:', error);
    return [];
  }
};

export const createCalendarEvent = async (eventData) => {
  try {
    const raw = await AsyncStorage.getItem(CALENDAR_KEY);
    const events = raw ? JSON.parse(raw) : [];
    
    const newEvent = {
      id: `e${Date.now()}`,
      title: eventData.title,
      description: eventData.description || '',
      date: eventData.date,
      time: eventData.time || '',
      type: eventData.type || 'general',
      color: eventData.color || '#3b82f6',
      createdAt: new Date().toISOString(),
      createdBy: eventData.createdBy,
    };
    
    const updated = [...events, newEvent];
    await AsyncStorage.setItem(CALENDAR_KEY, JSON.stringify(updated));
    
    return newEvent;
  } catch (error) {
    console.error('Error creating calendar event:', error);
    throw error;
  }
};

export const updateCalendarEvent = async (eventId, updates) => {
  try {
    const raw = await AsyncStorage.getItem(CALENDAR_KEY);
    const events = raw ? JSON.parse(raw) : [];
    
    const updated = events.map((event) =>
      event.id === eventId
        ? { ...event, ...updates, updatedAt: new Date().toISOString() }
        : event
    );
    
    await AsyncStorage.setItem(CALENDAR_KEY, JSON.stringify(updated));
    return updated.find((e) => e.id === eventId);
  } catch (error) {
    console.error('Error updating calendar event:', error);
    throw error;
  }
};

export const deleteCalendarEvent = async (eventId) => {
  try {
    const raw = await AsyncStorage.getItem(CALENDAR_KEY);
    const events = raw ? JSON.parse(raw) : [];
    
    const updated = events.filter((event) => event.id !== eventId);
    await AsyncStorage.setItem(CALENDAR_KEY, JSON.stringify(updated));
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting calendar event:', error);
    throw error;
  }
};

// ====== Innstillinger ======

export const getSettings = async () => {
  try {
    const raw = await AsyncStorage.getItem(SETTINGS_KEY);
    if (!raw) {
      const defaultSettings = {
        kindergartenName: 'Solstråle Barnehage',
        kindergartenLogo: null,
        address: 'Barnehageveien 1, 0001 Oslo',
        phone: '22 33 44 55',
        email: 'post@solstrale.no',
        openingHours: {
          open: '07:00',
          close: '17:00',
        },
      };
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(defaultSettings));
      return defaultSettings;
    }
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error loading settings:', error);
    return {};
  }
};

export const updateSettings = async (updates) => {
  try {
    const settings = await getSettings();
    const updated = { ...settings, ...updates };
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Error updating settings:', error);
    throw error;
  }
};

// ====== Barn-funksjoner ======

export const getAllChildren = async () => {
  return await loadChildren();
};

export const getChildrenByDate = async (date) => {
  const children = await loadChildren();
  return children;
};

export const getChildById = async (id) => {
  const children = await loadChildren();
  return children.find((c) => c.id === id);
};

export const createChild = async (childData) => {
  const children = await loadChildren();
  const nextId = 
    children.length === 0 
      ? '1' 
      : String(Math.max(...children.map((c) => parseInt(c.id))) + 1);
  
  const newChild = {
    id: nextId,
    name: childData.name,
    age: parseInt(childData.age),
    group: childData.group || 'Mauren',
    avatar: childData.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2),
    isCheckedIn: false,
    checkedOutAt: undefined,
    parents: childData.parents || [],
  };

  const updated = [...children, newChild];
  await saveChildren(updated);
  
  await saveToHistory({
    action: 'create',
    childId: newChild.id,
    childName: newChild.name,
  });

  return newChild;
};

export const updateChild = async (id, updates) => {
  const children = await loadChildren();
  const updated = children.map((child) =>
    child.id === id ? { ...child, ...updates } : child
  );
  await saveChildren(updated);
  
  await saveToHistory({
    action: 'update',
    childId: id,
    childName: children.find((c) => c.id === id)?.name,
  });

  return updated.find((c) => c.id === id);
};

export const deleteChild = async (id) => {
  const children = await loadChildren();
  const child = children.find((c) => c.id === id);
  const updated = children.filter((c) => c.id !== id);
  await saveChildren(updated);
  
  await saveToHistory({
    action: 'delete',
    childId: id,
    childName: child?.name,
  });

  return true;
};

export const checkInChild = async (id, performedBy) => {
  const children = await loadChildren();
  const child = children.find((c) => c.id === id);
  const now = new Date();
  const timeString = now.toLocaleTimeString('nb-NO', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const updated = children.map((c) =>
    c.id === id
      ? {
          ...c,
          isCheckedIn: true,
          checkedInAt: timeString,
          checkedOutAt: undefined,
        }
      : c
  );

  await saveChildren(updated);
  await logCheckInOut(id, child?.name, 'checkIn', performedBy);
  
  await saveToHistory({
    action: 'checkIn',
    childId: id,
    childName: child?.name,
    time: timeString,
  });

  return updated.find((c) => c.id === id);
};

export const checkOutChild = async (id, performedBy) => {
  const children = await loadChildren();
  const child = children.find((c) => c.id === id);
  const now = new Date();
  const timeString = now.toLocaleTimeString('nb-NO', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const updated = children.map((c) =>
    c.id === id
      ? {
          ...c,
          isCheckedIn: false,
          checkedOutAt: timeString,
          checkedInAt: undefined,
        }
      : c
  );

  await saveChildren(updated);
  await logCheckInOut(id, child?.name, 'checkOut', performedBy);
  
  await saveToHistory({
    action: 'checkOut',
    childId: id,
    childName: child?.name,
    time: timeString,
  });

  return updated.find((c) => c.id === id);
};

export const getHistory = async (options = {}) => {
  try {
    const raw = await AsyncStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    
    let history = JSON.parse(raw);

    if (options.date) {
      const targetDate = new Date(options.date).toDateString();
      history = history.filter((entry) => {
        const entryDate = new Date(entry.timestamp).toDateString();
        return entryDate === targetDate;
      });
    }

    if (options.childId) {
      history = history.filter((entry) => entry.childId === options.childId);
    }

    if (options.limit) {
      history = history.slice(0, options.limit);
    }

    return history;
  } catch (error) {
    console.error('Error loading history:', error);
    return [];
  }
};

export const resetData = async () => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(defaultChildren));
  await AsyncStorage.removeItem(HISTORY_KEY);
  await AsyncStorage.removeItem(CHECKIN_LOG_KEY);
  return defaultChildren;
};

export const deleteAllData = async () => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEY,
      HISTORY_KEY,
      USERS_KEY,
      CALENDAR_KEY,
      SETTINGS_KEY,
      CHECKIN_LOG_KEY,
    ]);
    return { success: true };
  } catch (error) {
    console.error('Error deleting all data:', error);
    throw error;
  }
};

export const addNote = async (childId, note) => {
  const children = await loadChildren();
  const updated = children.map((child) =>
    child.id === childId
      ? {
          ...child,
          notes: [
            ...(child.notes || []),
            {
              id: Date.now().toString(),
              text: note,
              timestamp: new Date().toISOString(),
            },
          ],
        }
      : child
  );

  await saveChildren(updated);
  return updated.find((c) => c.id === childId);
};

export const deleteNote = async (childId, noteId) => {
  const children = await loadChildren();
  const updated = children.map((child) =>
    child.id === childId
      ? {
          ...child,
          notes: (child.notes || []).filter((n) => n.id !== noteId),
        }
      : child
  );

  await saveChildren(updated);
  return updated.find((c) => c.id === childId);
};
