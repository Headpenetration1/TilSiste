// Mock data for Krysselista
// Dette er testdata for UI-utvikling

export const mockChildren = [
  {
    id: '1',
    name: 'Liam Jacobsen',
    age: 4,
    group: 'Mauren',
    avatar: 'LJ',
    isCheckedIn: true,
    checkedInAt: '07:45',
    parents: [
      {
        id: 'p1',
        name: 'Hege Nilsen',
        relation: 'Mor',
        phone: '912 34 567',
        email: 'hege.nilsen@example.com',
        isPrimary: true,
      },
      {
        id: 'p2',
        name: 'Jonas Nilsen',
        relation: 'Far',
        phone: '987 65 432',
        email: 'jonas.nilsen@example.com',
        isPrimary: false,
      },
    ],
  },
  {
    id: '2',
    name: 'Nora Nilsen',
    age: 5,
    group: 'Mauren',
    avatar: 'NN',
    isCheckedIn: true,
    checkedInAt: '08:15',
    parents: [
      {
        id: 'p3',
        name: 'Marie Nilsen',
        relation: 'Mor',
        phone: '456 78 901',
        email: 'marie.nilsen@example.com',
        isPrimary: true,
      },
    ],
  },
  {
    id: '3',
    name: 'Oliver Andersen',
    age: 3,
    group: 'Mauren',
    avatar: 'OA',
    isCheckedIn: false,
    checkedOutAt: '14:30',
    parents: [
      {
        id: 'p4',
        name: 'Erik Andersen',
        relation: 'Far',
        phone: '321 54 876',
        email: 'erik.andersen@example.com',
        isPrimary: true,
      },
      {
        id: 'p5',
        name: 'Linda Andersen',
        relation: 'Mor',
        phone: '654 32 198',
        email: 'linda.andersen@example.com',
        isPrimary: false,
      },
    ],
  },
  {
    id: '4',
    name: 'Sofie Eriksen',
    age: 4,
    group: 'Mauren',
    avatar: 'SE',
    isCheckedIn: false,
    checkedOutAt: '15:00',
    parents: [
      {
        id: 'p6',
        name: 'Thomas Eriksen',
        relation: 'Far',
        phone: '789 01 234',
        email: 'thomas.eriksen@example.com',
        isPrimary: true,
      },
    ],
  },
  {
    id: '5',
    name: 'Lucas Bakken',
    age: 5,
    group: 'Mauren',
    avatar: 'LB',
    isCheckedIn: true,
    checkedInAt: '08:00',
    parents: [
      {
        id: 'p7',
        name: 'Kristin Bakken',
        relation: 'Mor',
        phone: '234 56 789',
        email: 'kristin.bakken@example.com',
        isPrimary: true,
      },
      {
        id: 'p8',
        name: 'Anders Bakken',
        relation: 'Far',
        phone: '876 54 321',
        email: 'anders.bakken@example.com',
        isPrimary: false,
      },
    ],
  },
];

export const mockUser = {
  id: 'u1',
  name: 'Anne Hansen',
  email: 'anne.hansen@barnehagen.no',
  role: 'staff', // 'staff' | 'parent'
  avatar: 'AH',
};

export const mockStats = {
  totalChildren: 5,
  checkedIn: 3,
  checkedOut: 2,
};
