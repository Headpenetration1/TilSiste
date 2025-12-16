import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LANGUAGE_KEY = '@henteklar_language';


const resources = {
  nb: {
    translation: {
      appName: 'Henteklar',
      login: 'Logg inn',
      logout: 'Logg ut',
      back: 'Tilbake',
      search: 'Søk',
      save: 'Lagre',
      cancel: 'Avbryt',
      edit: 'Rediger',
      landing: {
        tagline: 'For barnehager',
        title: 'Hent barnet ditt på',
        titleHighlight: '1-2-3',
        subtitle: 'Erstatt det gamle Excel-arket med en moderne, sikker løsning. Foreldre og ansatte får full oversikt – på sekunder.',
        getStarted: 'Kom i gang',
        seeFeatures: 'Se funksjoner',
        featuresTitle: 'Alt du trenger, ingenting du ikke trenger',
        featuresSubtitle: 'Designet for å være så enkelt at selv besteforeldre klarer det uten opplæring.',
        ctaTitle: 'Klar til å forenkle hverdagen?',
        ctaSubtitle: 'Kom i gang på minutter. Ingen installasjon, ingen komplisert oppsett.',
        loginNow: 'Logg inn nå',
        copyright: '© 2024 FrostByte AS. Alle rettigheter reservert.'
      },
      features: {
        quickCheckIn: 'Rask inn/utsjekking',
        quickCheckInDesc: 'Kryss barn inn og ut med ett trykk. Enkelt for både foreldre og ansatte.',
        secure: 'Trygt og sikkert',
        secureDesc: 'GDPR-godkjent løsning med sikker lagring av all informasjon.',
        everywhere: 'Fungerer overalt',
        everywhereDesc: 'Bruk mobil, nettbrett eller PC. Alltid tilgjengelig når du trenger det.',
        overview: 'Full oversikt',
        overviewDesc: 'Se hvem som er i barnehagen, kontaktinfo og historikk på ett sted.'
      },
      loginPage: {
        subtitle: 'Logg inn for å fortsette',
        email: 'E-post',
        emailPlaceholder: 'din@epost.no',
        password: 'Passord',
        passwordPlaceholder: '••••••••',
        rememberMe: 'Husk meg',
        forgotPassword: 'Glemt passord?',
        loggingIn: 'Logger inn...',
        loginError: 'Feil e-post eller passord',
        fillAllFields: 'Vennligst fyll ut alle feltene',
        loginProblems: 'Problemer med innlogging?',
        contactKindergarten: 'Kontakt barnehagen'
      },
      dashboard: {
        title: 'Oversikt',
        totalChildren: 'Totalt barn',
        checkedIn: 'Inne nå',
        checkedOut: 'Hentet',
        allChildren: 'Alle barn',
        searchChildren: 'Søk etter barn...',
        noChildrenFound: 'Ingen barn funnet',
        inSince: 'Inne siden',
        pickedUp: 'Hentet',
        years: 'år'
      },
      checkInOut: {
        title: 'Sjekk inn / ut',
        subtitle: 'Trykk på et barn for å endre status',
        all: 'Alle',
        in: 'Inne',
        out: 'Hentet',
        checkIn: 'Sjekk inn',
        checkOut: 'Sjekk ut',
        checkedIn: 'ble sjekket inn kl.',
        checkedOut: 'ble sjekket ut kl.',
        noChildrenFound: 'Ingen barn funnet'
      },
      childProfile: {
        notFound: 'Barn ikke funnet',
        backToOverview: 'Tilbake til oversikt',
        inSince: 'Inne siden',
        contactInfo: 'Kontaktinformasjon',
        primary: 'Primær',
        sendEmail: 'Send e-post',
        quickActions: 'Hurtighandlinger',
        editProfile: 'Rediger profil',
        viewHistory: 'Se historikk'
      },
      settings: {
        title: 'Innstillinger',
        subtitle: 'Administrer konto og preferanser',
        account: 'Konto',
        profile: 'Profil',
        profileDesc: 'Rediger navn og kontaktinfo',
        security: 'Sikkerhet',
        securityDesc: 'Passord og to-faktor autentisering',
        preferences: 'Preferanser',
        notifications: 'Varsler',
        notificationsDesc: 'Administrer varsler og påminnelser',
        language: 'Språk',
        languageDesc: 'Norsk (Bokmål)',
        appearance: 'Utseende',
        appearanceDesc: 'Lyst tema',
        staff: 'Ansatt',
        parent: 'Forelder',
        version: 'v2.0.0'
      },
      nav: {
        overview: 'Oversikt',
        checkInOut: 'Sjekk inn/ut',
        calendar: 'Kalender',
        history: 'Historikk',
        settings: 'Innstillinger'
      },
      calendar: {
        title: 'Kalender',
        subtitle: 'Hold oversikt over viktige datoer',
        addEvent: 'Legg til hendelse',
        noEvents: 'Ingen hendelser denne dagen',
        eventTypes: {
          meeting: 'Foreldremøte',
          trip: 'Turdag',
          holiday: 'Stengt/Ferie',
          event: 'Arrangement',
          general: 'Annet'
        }
      },
      addChild: {
        title: 'Registrer nytt barn',
        subtitle: 'Fyll inn informasjon om barnet',
        childInfo: 'Barnets informasjon',
        childName: 'Navn',
        childNamePlaceholder: 'F.eks. Emma Hansen',
        childAge: 'Alder',
        childAgePlaceholder: '4',
        childGroup: 'Gruppe',
        childGroupPlaceholder: 'F.eks. Mauren',
        parentInfo: 'Foresatt informasjon',
        parentName: 'Navn på foresatt',
        parentNamePlaceholder: 'F.eks. Hege Hansen',
        parentRelation: 'Relasjon',
        parentRelationPlaceholder: 'F.eks. Mor',
        parentPhone: 'Telefon',
        parentPhonePlaceholder: '912 34 567',
        parentEmail: 'E-post',
        parentEmailPlaceholder: 'forelder@example.com',
        save: 'Lagre barn',
        success: 'Barn registrert!',
        successMessage: '{{name}} har blitt registrert i systemet.',
        errors: {
          nameRequired: 'Navn må fylles ut',
          ageRequired: 'Alder må fylles ut',
          ageInvalid: 'Alder må være et gyldig tall',
          parentNameRequired: 'Navn på foresatt må fylles ut',
          phoneInvalid: 'Ugyldig telefonnummer',
          emailInvalid: 'Ugyldig e-postadresse'
        }
      },
      history: {
        title: 'Historikk',
        activities: 'Aktiviteter',
        events: 'hendelser',
        checkIns: 'Innsjekkinger',
        checkOuts: 'Utsjekkinger',
        noEvents: 'Ingen hendelser for denne dagen',
        checkedIn: '{{name}} ble sjekket inn kl. {{time}}',
        checkedOut: '{{name}} ble sjekket ut kl. {{time}}',
        created: '{{name}} ble registrert',
        updated: '{{name}} ble oppdatert',
        deleted: '{{name}} ble slettet'
      },
      loading: 'Laster...',
      ok: 'OK',
      relations: {
        mother: 'Mor',
        father: 'Far',
        guardian: 'Foresatt'
      }
    }
  },
  en: {
    translation: {
      appName: 'Henteklar',
      login: 'Log in',
      logout: 'Log out',
      back: 'Back',
      search: 'Search',
      save: 'Save',
      cancel: 'Cancel',
      edit: 'Edit',
      landing: {
        tagline: 'For kindergartens',
        title: 'Pick up your child in',
        titleHighlight: '1-2-3',
        subtitle: 'Replace the old Excel sheet with a modern, secure solution. Parents and staff get a complete overview – in seconds.',
        getStarted: 'Get started',
        seeFeatures: 'See features',
        featuresTitle: 'Everything you need, nothing you don\'t',
        featuresSubtitle: 'Designed to be so simple that even grandparents can use it without training.',
        ctaTitle: 'Ready to simplify your day?',
        ctaSubtitle: 'Get started in minutes. No installation, no complicated setup.',
        loginNow: 'Log in now',
        copyright: '© 2024 FrostByte AS. All rights reserved.'
      },
      features: {
        quickCheckIn: 'Quick check-in/out',
        quickCheckInDesc: 'Check children in and out with one tap. Simple for both parents and staff.',
        secure: 'Safe and secure',
        secureDesc: 'GDPR-compliant solution with secure storage of all information.',
        everywhere: 'Works everywhere',
        everywhereDesc: 'Use on mobile, tablet or PC. Always available when you need it.',
        overview: 'Full overview',
        overviewDesc: 'See who\'s in the kindergarten, contact info and history in one place.'
      },
      loginPage: {
        subtitle: 'Log in to continue',
        email: 'Email',
        emailPlaceholder: 'your@email.com',
        password: 'Password',
        passwordPlaceholder: '••••••••',
        rememberMe: 'Remember me',
        forgotPassword: 'Forgot password?',
        loggingIn: 'Logging in...',
        loginError: 'Wrong email or password',
        fillAllFields: 'Please fill in all fields',
        loginProblems: 'Problems logging in?',
        contactKindergarten: 'Contact the kindergarten'
      },
      dashboard: {
        title: 'Overview',
        totalChildren: 'Total children',
        checkedIn: 'Checked in',
        checkedOut: 'Picked up',
        allChildren: 'All children',
        searchChildren: 'Search for children...',
        noChildrenFound: 'No children found',
        inSince: 'In since',
        pickedUp: 'Picked up',
        years: 'years'
      },
      checkInOut: {
        title: 'Check in / out',
        subtitle: 'Tap on a child to change status',
        all: 'All',
        in: 'In',
        out: 'Out',
        checkIn: 'Check in',
        checkOut: 'Check out',
        checkedIn: 'was checked in at',
        checkedOut: 'was checked out at',
        noChildrenFound: 'No children found'
      },
      childProfile: {
        notFound: 'Child not found',
        backToOverview: 'Back to overview',
        inSince: 'In since',
        contactInfo: 'Contact information',
        primary: 'Primary',
        sendEmail: 'Send email',
        quickActions: 'Quick actions',
        editProfile: 'Edit profile',
        viewHistory: 'View history'
      },
      settings: {
        title: 'Settings',
        subtitle: 'Manage account and preferences',
        account: 'Account',
        profile: 'Profile',
        profileDesc: 'Edit name and contact info',
        security: 'Security',
        securityDesc: 'Password and two-factor authentication',
        preferences: 'Preferences',
        notifications: 'Notifications',
        notificationsDesc: 'Manage notifications and reminders',
        language: 'Language',
        languageDesc: 'English',
        appearance: 'Appearance',
        appearanceDesc: 'Light theme',
        staff: 'Staff',
        parent: 'Parent',
        version: 'v2.0.0'
      },
      nav: {
        overview: 'Overview',
        checkInOut: 'Check in/out',
        calendar: 'Calendar',
        history: 'History',
        settings: 'Settings'
      },
      calendar: {
        title: 'Calendar',
        subtitle: 'Keep track of important dates',
        addEvent: 'Add event',
        noEvents: 'No events on this day',
        eventTypes: {
          meeting: 'Parent meeting',
          trip: 'Trip day',
          holiday: 'Closed/Holiday',
          event: 'Event',
          general: 'Other'
        }
      },
      addChild: {
        title: 'Register new child',
        subtitle: 'Fill in information about the child',
        childInfo: 'Child information',
        childName: 'Name',
        childNamePlaceholder: 'E.g. Emma Hansen',
        childAge: 'Age',
        childAgePlaceholder: '4',
        childGroup: 'Group',
        childGroupPlaceholder: 'E.g. The Ant',
        parentInfo: 'Parent information',
        parentName: 'Parent name',
        parentNamePlaceholder: 'E.g. Hege Hansen',
        parentRelation: 'Relation',
        parentRelationPlaceholder: 'E.g. Mother',
        parentPhone: 'Phone',
        parentPhonePlaceholder: '912 34 567',
        parentEmail: 'Email',
        parentEmailPlaceholder: 'parent@example.com',
        save: 'Save child',
        success: 'Child registered!',
        successMessage: '{{name}} has been registered in the system.',
        errors: {
          nameRequired: 'Name must be filled in',
          ageRequired: 'Age must be filled in',
          ageInvalid: 'Age must be a valid number',
          parentNameRequired: 'Parent name must be filled in',
          phoneInvalid: 'Invalid phone number',
          emailInvalid: 'Invalid email address'
        }
      },
      history: {
        title: 'History',
        activities: 'Activities',
        events: 'events',
        checkIns: 'Check-ins',
        checkOuts: 'Check-outs',
        noEvents: 'No events for this day',
        checkedIn: '{{name}} was checked in at {{time}}',
        checkedOut: '{{name}} was checked out at {{time}}',
        created: '{{name}} was registered',
        updated: '{{name}} was updated',
        deleted: '{{name}} was deleted'
      },
      loading: 'Loading...',
      ok: 'OK',
      relations: {
        mother: 'Mother',
        father: 'Father',
        guardian: 'Guardian'
      }
    }
  },
  ar: {
    translation: {
      appName: 'Henteklar',
      login: 'تسجيل الدخول',
      logout: 'تسجيل الخروج',
      back: 'رجوع',
      search: 'بحث',
      save: 'حفظ',
      cancel: 'إلغاء',
      edit: 'تعديل',
      landing: {
        tagline: 'لرياض الأطفال',
        title: 'استلم طفلك خلال',
        titleHighlight: '١-٢-٣',
        subtitle: 'استبدل ملف إكسل القديم بحل حديث وآمن. يحصل الأهل والموظفون على نظرة كاملة في ثوانٍ.',
        getStarted: 'ابدأ الآن',
        seeFeatures: 'عرض المميزات',
        featuresTitle: 'كل ما تحتاجه، ولا شيء زائد',
        featuresSubtitle: 'مصمم ليكون بسيطًا لدرجة أن حتى الأجداد يمكنهم استخدامه دون تدريب.',
        ctaTitle: 'جاهز لتبسيط يومك؟',
        ctaSubtitle: 'ابدأ خلال دقائق. بدون تثبيت أو إعداد معقد.',
        loginNow: 'سجّل الدخول الآن',
        copyright: '© ٢٠٢٤ FrostByte AS. جميع الحقوق محفوظة.'
      },
      features: {
        quickCheckIn: 'تسجيل دخول/خروج سريع',
        quickCheckInDesc: 'سجّل دخول وخروج الأطفال بلمسة واحدة. سهل للأهل والموظفين.',
        secure: 'آمن ومحمي',
        secureDesc: 'حل متوافق مع اللائحة العامة لحماية البيانات (GDPR) مع تخزين آمن لجميع المعلومات.',
        everywhere: 'يعمل في كل مكان',
        everywhereDesc: 'استخدمه على الهاتف أو الجهاز اللوحي أو الحاسوب. متوفر دائمًا عندما تحتاجه.',
        overview: 'نظرة شاملة',
        overviewDesc: 'شاهد من في الروضة، ومعلومات التواصل، والسجل في مكان واحد.'
      },
      loginPage: {
        subtitle: 'قم بتسجيل الدخول للمتابعة',
        email: 'البريد الإلكتروني',
        emailPlaceholder: 'you@example.com',
        password: 'كلمة المرور',
        passwordPlaceholder: '••••••••',
        rememberMe: 'تذكرني',
        forgotPassword: 'هل نسيت كلمة المرور؟',
        loggingIn: 'جارٍ تسجيل الدخول...',
        loginError: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
        fillAllFields: 'يرجى تعبئة جميع الحقول',
        loginProblems: 'هل تواجه مشاكل في تسجيل الدخول؟',
        contactKindergarten: 'اتصل بالروضة'
      },
      dashboard: {
        title: 'نظرة عامة',
        totalChildren: 'إجمالي عدد الأطفال',
        checkedIn: 'مسجَّلون حضورًا',
        checkedOut: 'تم استلامهم',
        allChildren: 'جميع الأطفال',
        searchChildren: 'ابحث عن الأطفال...',
        noChildrenFound: 'لم يتم العثور على أطفال',
        inSince: 'حاضر منذ',
        pickedUp: 'تم استلامه',
        years: 'سنوات'
      },
      checkInOut: {
        title: 'تسجيل دخول / خروج',
        subtitle: 'اضغط على الطفل لتغيير الحالة',
        all: 'الكل',
        in: 'حاضر',
        out: 'غائب',
        checkIn: 'تسجيل دخول',
        checkOut: 'تسجيل خروج',
        checkedIn: 'تم تسجيل دخوله في',
        checkedOut: 'تم تسجيل خروجه في',
        noChildrenFound: 'لم يتم العثور على أطفال'
      },
      childProfile: {
        notFound: 'لم يتم العثور على الطفل',
        backToOverview: 'العودة إلى النظرة العامة',
        inSince: 'حاضر منذ',
        contactInfo: 'معلومات التواصل',
        primary: 'أساسي',
        sendEmail: 'إرسال بريد إلكتروني',
        quickActions: 'إجراءات سريعة',
        editProfile: 'تعديل الملف الشخصي',
        viewHistory: 'عرض السجل'
      },
      settings: {
        title: 'الإعدادات',
        subtitle: 'إدارة الحساب والتفضيلات',
        account: 'الحساب',
        profile: 'الملف الشخصي',
        profileDesc: 'تعديل الاسم ومعلومات التواصل',
        security: 'الأمان',
        securityDesc: 'كلمة المرور والمصادقة الثنائية',
        preferences: 'التفضيلات',
        notifications: 'الإشعارات',
        notificationsDesc: 'إدارة الإشعارات والتذكيرات',
        language: 'اللغة',
        languageDesc: 'العربية',
        appearance: 'المظهر',
        appearanceDesc: 'سمة فاتحة',
        staff: 'موظف',
        parent: 'ولي أمر',
        version: 'الإصدار v2.0.0'
      },
      nav: {
        overview: 'نظرة عامة',
        checkInOut: 'تسجيل دخول/خروج',
        calendar: 'التقويم',
        history: 'السجل',
        settings: 'الإعدادات'
      },
      calendar: {
        title: 'التقويم',
        subtitle: 'تتبع التواريخ المهمة',
        addEvent: 'إضافة حدث',
        noEvents: 'لا توجد أحداث في هذا اليوم',
        eventTypes: {
          meeting: 'اجتماع أولياء الأمور',
          trip: 'يوم رحلة',
          holiday: 'إغلاق/عطلة',
          event: 'حدث',
          general: 'أخرى'
        }
      },
      addChild: {
        title: 'تسجيل طفل جديد',
        subtitle: 'أدخل معلومات الطفل',
        childInfo: 'معلومات الطفل',
        childName: 'الاسم',
        childNamePlaceholder: 'مثال: إيما هانسن',
        childAge: 'العمر',
        childAgePlaceholder: '٤',
        childGroup: 'المجموعة',
        childGroupPlaceholder: 'مثال: النملة',
        parentInfo: 'معلومات ولي الأمر',
        parentName: 'اسم ولي الأمر',
        parentNamePlaceholder: 'مثال: هيغه هانسن',
        parentRelation: 'العلاقة',
        parentRelationPlaceholder: 'مثال: الأم',
        parentPhone: 'الهاتف',
        parentPhonePlaceholder: '912 34 567',
        parentEmail: 'البريد الإلكتروني',
        parentEmailPlaceholder: 'parent@example.com',
        save: 'حفظ الطفل',
        success: 'تم تسجيل الطفل!',
        successMessage: 'تم تسجيل {{name}} في النظام.',
        errors: {
          nameRequired: 'يجب إدخال الاسم',
          ageRequired: 'يجب إدخال العمر',
          ageInvalid: 'يجب أن يكون العمر رقمًا صالحًا',
          parentNameRequired: 'يجب إدخال اسم ولي الأمر',
          phoneInvalid: 'رقم هاتف غير صالح',
          emailInvalid: 'عنوان بريد إلكتروني غير صالح'
        }
      },
      history: {
        title: 'السجل',
        activities: 'الأنشطة',
        events: 'الأحداث',
        checkIns: 'تسجيلات الدخول',
        checkOuts: 'تسجيلات الخروج',
        noEvents: 'لا توجد أحداث في هذا اليوم',
        checkedIn: '{{name}} تم تسجيل دخوله في {{time}}',
        checkedOut: '{{name}} تم تسجيل خروجه في {{time}}',
        created: 'تم تسجيل {{name}}',
        updated: 'تم تحديث {{name}}',
        deleted: 'تم حذف {{name}}'
      },
      loading: 'جارٍ التحميل...',
      ok: 'حسنًا',
      relations: {
        mother: 'الأم',
        father: 'الأب',
        guardian: 'الوصي'
      }
    }
  },
  pl: {
    translation: {
      appName: 'Henteklar',
      login: 'Zaloguj się',
      logout: 'Wyloguj się',
      back: 'Wstecz',
      search: 'Szukaj',
      save: 'Zapisz',
      cancel: 'Anuluj',
      edit: 'Edytuj',
      landing: {
        tagline: 'Dla przedszkoli',
        title: 'Odbierz swoje dziecko w',
        titleHighlight: '1-2-3',
        subtitle: 'Zastąp starą tabelę Excela nowoczesnym, bezpiecznym rozwiązaniem. Rodzice i personel otrzymują pełny przegląd w kilka sekund.',
        getStarted: 'Zacznij teraz',
        seeFeatures: 'Zobacz funkcje',
        featuresTitle: 'Wszystko, czego potrzebujesz, bez zbędnych dodatków',
        featuresSubtitle: 'Zaprojektowany tak, aby był tak prosty, że nawet dziadkowie poradzą sobie bez szkolenia.',
        ctaTitle: 'Gotowy, aby ułatwić sobie dzień?',
        ctaSubtitle: 'Zacznij w kilka minut. Bez instalacji i skomplikowanej konfiguracji.',
        loginNow: 'Zaloguj się teraz',
        copyright: '© 2024 FrostByte AS. Wszelkie prawa zastrzeżone.'
      },
      features: {
        quickCheckIn: 'Szybkie meldowanie/odbieranie',
        quickCheckInDesc: 'Oznacz przyjście i wyjście dzieci jednym kliknięciem. Proste dla rodziców i personelu.',
        secure: 'Bezpieczny',
        secureDesc: 'Rozwiązanie zgodne z RODO z bezpiecznym przechowywaniem wszystkich informacji.',
        everywhere: 'Działa wszędzie',
        everywhereDesc: 'Używaj na telefonie, tablecie lub komputerze. Zawsze dostępny, kiedy go potrzebujesz.',
        overview: 'Pełny przegląd',
        overviewDesc: 'Zobacz, kto jest w przedszkolu, dane kontaktowe i historię w jednym miejscu.'
      },
      loginPage: {
        subtitle: 'Zaloguj się, aby kontynuować',
        email: 'E-mail',
        emailPlaceholder: 'twoj@email.com',
        password: 'Hasło',
        passwordPlaceholder: '••••••••',
        rememberMe: 'Zapamiętaj mnie',
        forgotPassword: 'Nie pamiętasz hasła?',
        loggingIn: 'Logowanie...',
        loginError: 'Nieprawidłowy e-mail lub hasło',
        fillAllFields: 'Proszę wypełnić wszystkie pola',
        loginProblems: 'Masz problem z logowaniem?',
        contactKindergarten: 'Skontaktuj się z przedszkolem'
      },
      dashboard: {
        title: 'Przegląd',
        totalChildren: 'Liczba dzieci',
        checkedIn: 'Obecne',
        checkedOut: 'Odebrane',
        allChildren: 'Wszystkie dzieci',
        searchChildren: 'Szukaj dzieci...',
        noChildrenFound: 'Nie znaleziono dzieci',
        inSince: 'Obecny od',
        pickedUp: 'Odebrane',
        years: 'lat'
      },
      checkInOut: {
        title: 'Meldowanie / odbieranie',
        subtitle: 'Stuknij dziecko, aby zmienić status',
        all: 'Wszystkie',
        in: 'Obecne',
        out: 'Nieobecne',
        checkIn: 'Zamelduj',
        checkOut: 'Odbierz',
        checkedIn: 'zameldowano o',
        checkedOut: 'odebrano o',
        noChildrenFound: 'Nie znaleziono dzieci'
      },
      childProfile: {
        notFound: 'Nie znaleziono dziecka',
        backToOverview: 'Powrót do przeglądu',
        inSince: 'Obecny od',
        contactInfo: 'Dane kontaktowe',
        primary: 'Główny',
        sendEmail: 'Wyślij e-mail',
        quickActions: 'Szybkie akcje',
        editProfile: 'Edytuj profil',
        viewHistory: 'Pokaż historię'
      },
      settings: {
        title: 'Ustawienia',
        subtitle: 'Zarządzaj kontem i preferencjami',
        account: 'Konto',
        profile: 'Profil',
        profileDesc: 'Edytuj imię, nazwisko i dane kontaktowe',
        security: 'Bezpieczeństwo',
        securityDesc: 'Hasło i uwierzytelnianie dwuskładnikowe',
        preferences: 'Preferencje',
        notifications: 'Powiadomienia',
        notificationsDesc: 'Zarządzaj powiadomieniami i przypomnieniami',
        language: 'Język',
        languageDesc: 'Polski',
        appearance: 'Wygląd',
        appearanceDesc: 'Jasny motyw',
        staff: 'Personel',
        parent: 'Rodzic',
        version: 'v2.0.0'
      },
      nav: {
        overview: 'Przegląd',
        checkInOut: 'Meldowanie',
        calendar: 'Kalendarz',
        history: 'Historia',
        settings: 'Ustawienia'
      },
      calendar: {
        title: 'Kalendarz',
        subtitle: 'Śledź ważne daty',
        addEvent: 'Dodaj wydarzenie',
        noEvents: 'Brak wydarzeń w tym dniu',
        eventTypes: {
          meeting: 'Zebranie z rodzicami',
          trip: 'Dzień wycieczki',
          holiday: 'Zamknięte/święto',
          event: 'Wydarzenie',
          general: 'Inne'
        }
      },
      addChild: {
        title: 'Zarejestruj nowe dziecko',
        subtitle: 'Wpisz informacje o dziecku',
        childInfo: 'Informacje o dziecku',
        childName: 'Imię i nazwisko',
        childNamePlaceholder: 'np. Emma Hansen',
        childAge: 'Wiek',
        childAgePlaceholder: '4',
        childGroup: 'Grupa',
        childGroupPlaceholder: 'np. Mrówki',
        parentInfo: 'Informacje o opiekunie',
        parentName: 'Imię i nazwisko opiekuna',
        parentNamePlaceholder: 'np. Hege Hansen',
        parentRelation: 'Relacja',
        parentRelationPlaceholder: 'np. mama',
        parentPhone: 'Telefon',
        parentPhonePlaceholder: '912 34 567',
        parentEmail: 'E-mail',
        parentEmailPlaceholder: 'rodzic@example.com',
        save: 'Zapisz dziecko',
        success: 'Dziecko zostało zarejestrowane!',
        successMessage: '{{name}} zostało zarejestrowane w systemie.',
        errors: {
          nameRequired: 'Imię i nazwisko jest wymagane',
          ageRequired: 'Wiek jest wymagany',
          ageInvalid: 'Wiek musi być poprawną liczbą',
          parentNameRequired: 'Imię i nazwisko opiekuna jest wymagane',
          phoneInvalid: 'Nieprawidłowy numer telefonu',
          emailInvalid: 'Nieprawidłowy adres e-mail'
        }
      },
      history: {
        title: 'Historia',
        activities: 'Aktywności',
        events: 'wydarzenia',
        checkIns: 'Wejścia',
        checkOuts: 'Wyjścia',
        noEvents: 'Brak wydarzeń w tym dniu',
        checkedIn: '{{name}} został zameldowany o {{time}}',
        checkedOut: '{{name}} został odebrany o {{time}}',
        created: '{{name}} został zarejestrowany',
        updated: 'Dane {{name}} zostały zaktualizowane',
        deleted: '{{name}} został usunięty'
      },
      loading: 'Ładowanie...',
      ok: 'OK',
      relations: {
        mother: 'Mama',
        father: 'Tata',
        guardian: 'Opiekun'
      }
    }
  },
  se: {
    translation: {
      appName: 'Henteklar',
      login: 'Logg inn',
      logout: 'Logg ut',
      back: 'Tilbake',
      search: 'Søk',
      save: 'Lagre',
      cancel: 'Avbryt',
      edit: 'Rediger',
      landing: {
        tagline: 'For barnehager',
        title: 'Hent barnet ditt på',
        titleHighlight: '1-2-3',
        subtitle: 'Erstatt det gamle Excel-arket med en moderne, sikker løsning. Foreldre og ansatte får full oversikt – på sekunder.',
        getStarted: 'Kom i gang',
        seeFeatures: 'Se funksjoner',
        featuresTitle: 'Alt du trenger, ingenting du ikke trenger',
        featuresSubtitle: 'Designet for å være så enkelt at selv besteforeldre klarer det uten opplæring.',
        ctaTitle: 'Klar til å forenkle hverdagen?',
        ctaSubtitle: 'Kom i gang på minutter. Ingen installasjon, ingen komplisert oppsett.',
        loginNow: 'Logg inn nå',
        copyright: '© 2024 FrostByte AS. Alle rettigheter reservert.'
      },
      features: {
        quickCheckIn: 'Rask inn/utsjekking',
        quickCheckInDesc: 'Kryss barn inn og ut med ett trykk. Enkelt for både foreldre og ansatte.',
        secure: 'Trygt og sikkert',
        secureDesc: 'GDPR-godkjent løsning med sikker lagring av all informasjon.',
        everywhere: 'Fungerer overalt',
        everywhereDesc: 'Bruk mobil, nettbrett eller PC. Alltid tilgjengelig når du trenger det.',
        overview: 'Full oversikt',
        overviewDesc: 'Se hvem som er i barnehagen, kontaktinfo og historikk på ett sted.'
      },
      loginPage: {
        subtitle: 'Logg inn for å fortsette',
        email: 'E-post',
        emailPlaceholder: 'din@epost.no',
        password: 'Passord',
        passwordPlaceholder: '••••••••',
        rememberMe: 'Husk meg',
        forgotPassword: 'Glemt passord?',
        loggingIn: 'Logger inn...',
        loginError: 'Feil e-post eller passord',
        fillAllFields: 'Vennligst fyll ut alle feltene',
        loginProblems: 'Problemer med innlogging?',
        contactKindergarten: 'Kontakt barnehagen'
      },
      dashboard: {
        title: 'Oversikt',
        totalChildren: 'Totalt barn',
        checkedIn: 'Inne nå',
        checkedOut: 'Hentet',
        allChildren: 'Alle barn',
        searchChildren: 'Søk etter barn...',
        noChildrenFound: 'Ingen barn funnet',
        inSince: 'Inne siden',
        pickedUp: 'Hentet',
        years: 'år'
      },
      checkInOut: {
        title: 'Sjekk inn / ut',
        subtitle: 'Trykk på et barn for å endre status',
        all: 'Alle',
        in: 'Inne',
        out: 'Hentet',
        checkIn: 'Sjekk inn',
        checkOut: 'Sjekk ut',
        checkedIn: 'ble sjekket inn kl.',
        checkedOut: 'ble sjekket ut kl.',
        noChildrenFound: 'Ingen barn funnet'
      },
      childProfile: {
        notFound: 'Barn ikke funnet',
        backToOverview: 'Tilbake til oversikt',
        inSince: 'Inne siden',
        contactInfo: 'Kontaktinformasjon',
        primary: 'Primær',
        sendEmail: 'Send e-post',
        quickActions: 'Hurtighandlinger',
        editProfile: 'Rediger profil',
        viewHistory: 'Se historikk'
      },
      settings: {
        title: 'Innstillinger',
        subtitle: 'Administrer konto og preferanser',
        account: 'Konto',
        profile: 'Profil',
        profileDesc: 'Rediger navn og kontaktinfo',
        security: 'Sikkerhet',
        securityDesc: 'Passord og to-faktor autentisering',
        preferences: 'Preferanser',
        notifications: 'Varsler',
        notificationsDesc: 'Administrer varsler og påminnelser',
        language: 'Språk',
        languageDesc: 'Sámegiella',
        appearance: 'Utseende',
        appearanceDesc: 'Lyst tema',
        staff: 'Ansatt',
        parent: 'Forelder',
        version: 'v2.0.0'
      },
      nav: {
        overview: 'Oversikt',
        checkInOut: 'Sjekk inn/ut',
        calendar: 'Kalender',
        history: 'Historikk',
        settings: 'Innstillinger'
      },
      calendar: {
        title: 'Kalender',
        subtitle: 'Hold oversikt over viktige datoer',
        addEvent: 'Legg til hendelse',
        noEvents: 'Ingen hendelser denne dagen',
        eventTypes: {
          meeting: 'Foreldremøte',
          trip: 'Turdag',
          holiday: 'Stengt/Ferie',
          event: 'Arrangement',
          general: 'Annet'
        }
      },
      addChild: {
        title: 'Registrer nytt barn',
        subtitle: 'Fyll inn informasjon om barnet',
        childInfo: 'Barnets informasjon',
        childName: 'Navn',
        childNamePlaceholder: 'F.eks. Emma Hansen',
        childAge: 'Alder',
        childAgePlaceholder: '4',
        childGroup: 'Gruppe',
        childGroupPlaceholder: 'F.eks. Mauren',
        parentInfo: 'Foresatt informasjon',
        parentName: 'Navn på foresatt',
        parentNamePlaceholder: 'F.eks. Hege Hansen',
        parentRelation: 'Relasjon',
        parentRelationPlaceholder: 'F.eks. Mor',
        parentPhone: 'Telefon',
        parentPhonePlaceholder: '912 34 567',
        parentEmail: 'E-post',
        parentEmailPlaceholder: 'forelder@example.com',
        save: 'Lagre barn',
        success: 'Barn registrert!',
        successMessage: '{{name}} har blitt registrert i systemet.',
        errors: {
          nameRequired: 'Navn må fylles ut',
          ageRequired: 'Alder må fylles ut',
          ageInvalid: 'Alder må være et gyldig tall',
          parentNameRequired: 'Navn på foresatt må fylles ut',
          phoneInvalid: 'Ugyldig telefonnummer',
          emailInvalid: 'Ugyldig e-postadresse'
        }
      },
      history: {
        title: 'Historikk',
        activities: 'Aktiviteter',
        events: 'hendelser',
        checkIns: 'Innsjekkinger',
        checkOuts: 'Utsjekkinger',
        noEvents: 'Ingen hendelser for denne dagen',
        checkedIn: '{{name}} ble sjekket inn kl. {{time}}',
        checkedOut: '{{name}} ble sjekket ut kl. {{time}}',
        created: '{{name}} ble registrert',
        updated: '{{name}} ble oppdatert',
        deleted: '{{name}} ble slettet'
      },
      loading: 'Laster...',
      ok: 'OK',
      relations: {
        mother: 'Mor',
        father: 'Far',
        guardian: 'Foresatt'
      }
    }
  },
  de: {
    translation: {
      appName: 'Henteklar',
      login: 'Anmelden',
      logout: 'Abmelden',
      back: 'Zurück',
      search: 'Suchen',
      save: 'Speichern',
      cancel: 'Abbrechen',
      edit: 'Bearbeiten',
      landing: {
        tagline: 'Für Kindergärten',
        title: 'Hol dein Kind ab in',
        titleHighlight: '1-2-3',
        subtitle: 'Ersetze die alte Excel-Tabelle durch eine moderne, sichere Lösung. Eltern und Mitarbeitende erhalten in Sekunden den vollen Überblick.',
        getStarted: 'Jetzt starten',
        seeFeatures: 'Funktionen ansehen',
        featuresTitle: 'Alles, was du brauchst – ohne Schnickschnack',
        featuresSubtitle: 'So einfach gestaltet, dass sogar Großeltern es ohne Schulung nutzen können.',
        ctaTitle: 'Bereit, deinen Alltag zu vereinfachen?',
        ctaSubtitle: 'Starte in wenigen Minuten. Keine Installation, keine komplizierte Einrichtung.',
        loginNow: 'Jetzt anmelden',
        copyright: '© 2024 FrostByte AS. Alle Rechte vorbehalten.'
      },
      features: {
        quickCheckIn: 'Schnelles Ein- und Auschecken',
        quickCheckInDesc: 'Kinder mit einem Tipp ein- und auschecken. Einfach für Eltern und Mitarbeitende.',
        secure: 'Sicher und geschützt',
        secureDesc: 'DSGVO-konforme Lösung mit sicherer Speicherung aller Informationen.',
        everywhere: 'Überall nutzbar',
        everywhereDesc: 'Auf Handy, Tablet oder PC verwenden. Immer verfügbar, wenn du es brauchst.',
        overview: 'Vollständiger Überblick',
        overviewDesc: 'Sieh, wer im Kindergarten ist, Kontaktdaten und Historie – alles an einem Ort.'
      },
      loginPage: {
        subtitle: 'Melde dich an, um fortzufahren',
        email: 'E-Mail',
        emailPlaceholder: 'deine@email.de',
        password: 'Passwort',
        passwordPlaceholder: '••••••••',
        rememberMe: 'Angemeldet bleiben',
        forgotPassword: 'Passwort vergessen?',
        loggingIn: 'Anmeldung läuft...',
        loginError: 'Falsche E-Mail oder falsches Passwort',
        fillAllFields: 'Bitte alle Felder ausfüllen',
        loginProblems: 'Probleme bei der Anmeldung?',
        contactKindergarten: 'Kontakt zum Kindergarten aufnehmen'
      },
      dashboard: {
        title: 'Übersicht',
        totalChildren: 'Anzahl Kinder',
        checkedIn: 'Anwesend',
        checkedOut: 'Abgeholt',
        allChildren: 'Alle Kinder',
        searchChildren: 'Kinder suchen...',
        noChildrenFound: 'Keine Kinder gefunden',
        inSince: 'Anwesend seit',
        pickedUp: 'Abgeholt',
        years: 'Jahre'
      },
      checkInOut: {
        title: 'Ein- / Auschecken',
        subtitle: 'Tippe auf ein Kind, um den Status zu ändern',
        all: 'Alle',
        in: 'Anwesend',
        out: 'Abgemeldet',
        checkIn: 'Einchecken',
        checkOut: 'Auschecken',
        checkedIn: 'wurde eingecheckt um',
        checkedOut: 'wurde ausgecheckt um',
        noChildrenFound: 'Keine Kinder gefunden'
      },
      childProfile: {
        notFound: 'Kind nicht gefunden',
        backToOverview: 'Zurück zur Übersicht',
        inSince: 'Anwesend seit',
        contactInfo: 'Kontaktinformationen',
        primary: 'Primär',
        sendEmail: 'E-Mail senden',
        quickActions: 'Schnellaktionen',
        editProfile: 'Profil bearbeiten',
        viewHistory: 'Historie anzeigen'
      },
      settings: {
        title: 'Einstellungen',
        subtitle: 'Konto und Einstellungen verwalten',
        account: 'Konto',
        profile: 'Profil',
        profileDesc: 'Name und Kontaktdaten bearbeiten',
        security: 'Sicherheit',
        securityDesc: 'Passwort und Zwei-Faktor-Authentifizierung',
        preferences: 'Voreinstellungen',
        notifications: 'Benachrichtigungen',
        notificationsDesc: 'Benachrichtigungen und Erinnerungen verwalten',
        language: 'Sprache',
        languageDesc: 'Deutsch',
        appearance: 'Design',
        appearanceDesc: 'Helles Design',
        staff: 'Mitarbeiter',
        parent: 'Elternteil',
        version: 'v2.0.0'
      },
      nav: {
        overview: 'Übersicht',
        checkInOut: 'Ein-/Auschecken',
        calendar: 'Kalender',
        history: 'Historie',
        settings: 'Einstellungen'
      },
      calendar: {
        title: 'Kalender',
        subtitle: 'Wichtige Termine im Blick behalten',
        addEvent: 'Ereignis hinzufügen',
        noEvents: 'Keine Ereignisse an diesem Tag',
        eventTypes: {
          meeting: 'Elternabend',
          trip: 'Ausflugstag',
          holiday: 'Geschlossen/Feiertag',
          event: 'Ereignis',
          general: 'Sonstiges'
        }
      },
      addChild: {
        title: 'Neues Kind registrieren',
        subtitle: 'Informationen zum Kind eintragen',
        childInfo: 'Informationen zum Kind',
        childName: 'Name',
        childNamePlaceholder: 'z. B. Emma Hansen',
        childAge: 'Alter',
        childAgePlaceholder: '4',
        childGroup: 'Gruppe',
        childGroupPlaceholder: 'z. B. Die Ameise',
        parentInfo: 'Informationen zu den Eltern',
        parentName: 'Name der Bezugsperson',
        parentNamePlaceholder: 'z. B. Hege Hansen',
        parentRelation: 'Beziehung',
        parentRelationPlaceholder: 'z. B. Mutter',
        parentPhone: 'Telefon',
        parentPhonePlaceholder: '912 34 567',
        parentEmail: 'E-Mail',
        parentEmailPlaceholder: 'eltern@example.com',
        save: 'Kind speichern',
        success: 'Kind registriert!',
        successMessage: '{{name}} wurde im System registriert.',
        errors: {
          nameRequired: 'Name muss ausgefüllt werden',
          ageRequired: 'Alter muss ausgefüllt werden',
          ageInvalid: 'Alter muss eine gültige Zahl sein',
          parentNameRequired: 'Name der Bezugsperson muss ausgefüllt werden',
          phoneInvalid: 'Ungültige Telefonnummer',
          emailInvalid: 'Ungültige E-Mail-Adresse'
        }
      },
      history: {
        title: 'Historie',
        activities: 'Aktivitäten',
        events: 'Ereignisse',
        checkIns: 'Anmeldungen',
        checkOuts: 'Abmeldungen',
        noEvents: 'Keine Ereignisse an diesem Tag',
        checkedIn: '{{name}} wurde um {{time}} eingecheckt',
        checkedOut: '{{name}} wurde um {{time}} ausgecheckt',
        created: '{{name}} wurde registriert',
        updated: '{{name}} wurde aktualisiert',
        deleted: '{{name}} wurde gelöscht'
      },
      loading: 'Lädt...',
      ok: 'OK',
      relations: {
        mother: 'Mutter',
        father: 'Vater',
        guardian: 'Erziehungsberechtigte/r'
      }
    }
  },
  so: {
    translation: {
      appName: 'Henteklar',
      login: 'Gali',
      logout: 'Ka bax',
      back: 'Dib u noqo',
      search: 'Raadi',
      save: 'Kaydi',
      cancel: 'Jooji',
      edit: 'Wax ka beddel',
      landing: {
        tagline: 'Loogu talagalay xannaanooyinka carruurta',
        title: 'Ka soo qaado ilmhaaga',
        titleHighlight: '1-2-3',
        subtitle: 'Ka beddel shaxda Excel-ka ee duugga ah xal casri ah oo ammaan ah. Waalidiinta iyo shaqaaluhu waxay helaan dulmar buuxa ilbiriqsiyo gudahood.',
        getStarted: 'Bilow hadda',
        seeFeatures: 'Eeg astaamaha',
        featuresTitle: 'Wax walba oo aad u baahan tahay, adigoon buunbuunin',
        featuresSubtitle: 'Waxaa loo naqshadeeyay inuu noqdo mid fudud oo xitaa awooweyaashu ay isticmaali karaan iyaga oo aan tababar qaadan.',
        ctaTitle: 'Diyaar ma u tahay inaad maalintaada fududeyso?',
        ctaSubtitle: 'Ku bilow dhowr daqiiqo gudahood. Looma baahna rakibid ama dejin adag.',
        loginNow: 'Hadda gal',
        copyright: '© 2024 FrostByte AS. Dhammaan xuquuqdu way dhawrsan yihiin.'
      },
      features: {
        quickCheckIn: 'Gelid/Degid degdeg ah',
        quickCheckInDesc: 'Hal taabasho ku calaamadee carruurta inay soo galeen ama baxeen. Aad ugu fudud waalidiinta iyo shaqaalaha.',
        secure: 'Amaan iyo sir',
        secureDesc: 'Xal u hogaansan GDPR oo xogta oo dhan si ammaan ah loo keydiyo.',
        everywhere: 'Waxay ka shaqeysaa meel kasta',
        everywhereDesc: 'Ka isticmaal taleefan, kiniin ama kombiyuutar. Had iyo jeer waa diyaar markaad u baahato.',
        overview: 'Dulmar buuxa',
        overviewDesc: 'Arag cidda xannaanada ku jirta, macluumaadka xiriirka iyo taariikhda meel keliya.'
      },
      loginPage: {
        subtitle: 'Si aad u sii waddo, fadlan gal',
        email: 'Email-ka',
        emailPlaceholder: 'adiga@example.com',
        password: 'Furaha sirta ah',
        passwordPlaceholder: '••••••••',
        rememberMe: 'I xasuuso',
        forgotPassword: 'Furaha sirta ah ma hilmaantay?',
        loggingIn: 'Waxaa lagu jiraa gelitaanka...',
        loginError: 'Email ama furaha sirta ah waa qalad',
        fillAllFields: 'Fadlan dhammaan meelaha buuxi',
        loginProblems: 'Dhibaato ayaa ka jirta gelitaanka?',
        contactKindergarten: 'La xiriir xannaanada'
      },
      dashboard: {
        title: 'Dulmar',
        totalChildren: 'Carruurta oo dhan',
        checkedIn: 'Jooga',
        checkedOut: 'La qaaday',
        allChildren: 'Carruurta oo dhan',
        searchChildren: 'Ka raadi carruurta...',
        noChildrenFound: 'Carruur lama helin',
        inSince: 'Joogay tan iyo',
        pickedUp: 'La qaaday',
        years: 'sano'
      },
      checkInOut: {
        title: 'Gelid / bixid',
        subtitle: 'Taabo ilmuhu si aad xaaladdiisa u beddesho',
        all: 'Dhammaan',
        in: 'Jooga',
        out: 'Ma joogo',
        checkIn: 'Calaamadee inuu yimid',
        checkOut: 'Calaamadee in la qaaday',
        checkedIn: 'waxaa la calaamadeeyay inuu yimid saacad',
        checkedOut: 'waxaa la calaamadeeyay in la qaaday saacad',
        noChildrenFound: 'Carruur lama helin'
      },
      childProfile: {
        notFound: 'Ilmo lama helin',
        backToOverview: 'Dib ugu noqo dulmarka',
        inSince: 'Joogay tan iyo',
        contactInfo: 'Macluumaadka xiriirka',
        primary: 'Ugu muhiimsan',
        sendEmail: 'Dir email',
        quickActions: 'Falal degdeg ah',
        editProfile: 'Wax ka beddel xogta',
        viewHistory: 'Eeg taariikhda'
      },
      settings: {
        title: 'Dejinta',
        subtitle: 'Maamul akoonka iyo doorbidyada',
        account: 'Akoon',
        profile: 'Xogta isticmaale',
        profileDesc: 'Magaca iyo xogta xiriirka ka beddel',
        security: 'Amni',
        securityDesc: 'Furaha sirta ah iyo xaqiijinta laba-tallaabo',
        preferences: 'Doorbidyo',
        notifications: 'Ogeysiisyo',
        notificationsDesc: 'Maamul ogeysiisyada iyo xasuusinta',
        language: 'Luuqad',
        languageDesc: 'Af-Soomaali',
        appearance: 'Muuqaal',
        appearanceDesc: 'Naqshad iftiin leh',
        staff: 'Shaqaale',
        parent: 'Waalid',
        version: 'v2.0.0'
      },
      nav: {
        overview: 'Dulmar',
        checkInOut: 'Gelid/Bixid',
        calendar: 'Kalandar',
        history: 'Taariikh',
        settings: 'Dejinta'
      },
      calendar: {
        title: 'Kalandar',
        subtitle: 'La soco taariikho muhiim ah',
        addEvent: 'Ku dar dhacdo',
        noEvents: 'Maalintan dhacdo ma jirto',
        eventTypes: {
          meeting: 'Kulanka waalidiinta',
          trip: 'Maalinta baxa',
          holiday: 'Xiran / Fasax',
          event: 'Dhacdo',
          general: 'Kale'
        }
      },
      addChild: {
        title: 'Ilmo cusub diiwaangeli',
        subtitle: 'Buuxi macluumaadka ilmha',
        childInfo: 'Macluumaadka ilmha',
        childName: 'Magaca',
        childNamePlaceholder: 'tusaale: Emma Hansen',
        childAge: 'Da\'da',
        childAgePlaceholder: '4',
        childGroup: 'Koox',
        childGroupPlaceholder: 'tusaale: Quraanjada',
        parentInfo: 'Macluumaadka waalidka',
        parentName: 'Magaca waalidka',
        parentNamePlaceholder: 'tusaale: Hege Hansen',
        parentRelation: 'Xiriirka',
        parentRelationPlaceholder: 'tusaale: Hooyo',
        parentPhone: 'Telefoon',
        parentPhonePlaceholder: '912 34 567',
        parentEmail: 'Email-ka',
        parentEmailPlaceholder: 'waalid@example.com',
        save: 'Ilmo kaydi',
        success: 'Ilmo waa la diiwaangeliyay!',
        successMessage: '{{name}} ayaa lagu daray nidaamka.',
        errors: {
          nameRequired: 'Magaca waa in la buuxiyo',
          ageRequired: 'Da\'da waa in la buuxiyo',
          ageInvalid: 'Da\'du waa inay noqotaa tiro sax ah',
          parentNameRequired: 'Magaca waalidka waa in la buuxiyo',
          phoneInvalid: 'Lambarka telefoonka waa qalad',
          emailInvalid: 'Cinwaanka emailka waa qalad'
        }
      },
      history: {
        title: 'Taariikh',
        activities: 'Hawlaha',
        events: 'dhacdooyin',
        checkIns: 'Gelitaanno',
        checkOuts: 'Bixitaanno',
        noEvents: 'Maalintan wax dhacdo ah ma jirto',
        checkedIn: '{{name}} waxaa la calaamadeeyay inuu yimid {{time}}',
        checkedOut: '{{name}} waxaa la calaamadeeyay in la qaaday {{time}}',
        created: '{{name}} ayaa la diiwaangeliyay',
        updated: 'Xogta {{name}} waa la cusboonaysiiyay',
        deleted: '{{name}} waa la tirtiray'
      },
      loading: 'Waxaa socota soo rarid...',
      ok: 'OK',
      relations: {
        mother: 'Hooyo',
        father: 'Aabe',
        guardian: 'Masuul'
      }
    }
  },
  ur: {
    translation: {
      appName: 'Henteklar',
      login: 'لاگ اِن',
      logout: 'لاگ آؤٹ',
      back: 'واپس',
      search: 'تلاش',
      save: 'محفوظ کریں',
      cancel: 'منسوخ کریں',
      edit: 'ترمیم کریں',
      landing: {
        tagline: 'نرسریوں کے لیے',
        title: 'اپنے بچے کو حاصل کریں',
        titleHighlight: '١-٢-٣',
        subtitle: 'پرانے ایکسل شیٹ کو جدید اور محفوظ حل سے بدل دیں۔ والدین اور عملہ چند سیکنڈ میں مکمل جھلک حاصل کرتے ہیں۔',
        getStarted: 'ابھی شروع کریں',
        seeFeatures: 'خصوصیات دیکھیں',
        featuresTitle: 'سب کچھ جو آپ کو چاہیے، بغیر فالتو چیزوں کے',
        featuresSubtitle: 'اتنا سادہ ڈیزائن کہ دادا دادی بھی بغیر تربیت کے استعمال کر سکیں۔',
        ctaTitle: 'کیا آپ اپنا دن آسان بنانا چاہتے ہیں؟',
        ctaSubtitle: 'چند منٹوں میں شروع کریں۔ نہ انسٹالیشن، نہ پیچیدہ سیٹ اَپ۔',
        loginNow: 'ابھی لاگ اِن کریں',
        copyright: '© 2024 FrostByte AS. جملہ حقوق محفوظ ہیں۔'
      },
      features: {
        quickCheckIn: 'تیز حاضری / روانگی',
        quickCheckInDesc: 'بچوں کی آمد اور روانگی ایک ہی ٹیپ سے درج کریں۔ والدین اور عملے دونوں کے لیے آسان۔',
        secure: 'محفوظ اور قابلِ اعتماد',
        secureDesc: 'جی ڈی پی آر (GDPR) کے مطابق حل جس میں تمام معلومات محفوظ طریقے سے ذخیرہ ہوتی ہیں۔',
        everywhere: 'ہر جگہ کام کرتا ہے',
        everywhereDesc: 'موبائل، ٹیبلٹ یا کمپیوٹر پر استعمال کریں۔ جب بھی ضرورت ہو، ہمیشہ دستیاب۔',
        overview: 'مکمل جائزہ',
        overviewDesc: 'دیکھیں کون نرسری میں ہے، رابطہ معلومات اور تاریخ سب ایک ہی جگہ۔'
      },
      loginPage: {
        subtitle: 'جاری رکھنے کے لیے لاگ اِن کریں',
        email: 'ای میل',
        emailPlaceholder: 'you@example.com',
        password: 'پاس ورڈ',
        passwordPlaceholder: '••••••••',
        rememberMe: 'مجھے یاد رکھیں',
        forgotPassword: 'پاس ورڈ بھول گئے؟',
        loggingIn: 'لاگ اِن ہو رہا ہے...',
        loginError: 'ای میل یا پاس ورڈ غلط ہے',
        fillAllFields: 'براہ کرم تمام خانے پُر کریں',
        loginProblems: 'لاگ اِن میں مسئلہ آ رہا ہے؟',
        contactKindergarten: 'نرسری سے رابطہ کریں'
      },
      dashboard: {
        title: 'جائزہ',
        totalChildren: 'کل بچے',
        checkedIn: 'حاضر',
        checkedOut: 'لے جایا گیا',
        allChildren: 'تمام بچے',
        searchChildren: 'بچوں میں تلاش کریں...',
        noChildrenFound: 'کوئی بچہ نہیں ملا',
        inSince: 'سے حاضر',
        pickedUp: 'لے جایا گیا',
        years: 'سال'
      },
      checkInOut: {
        title: 'حاضری / روانگی',
        subtitle: 'بچے کی حالت بدلنے کے لیے اس پر ٹیپ کریں',
        all: 'سب',
        in: 'حاضر',
        out: 'غیر حاضر',
        checkIn: 'حاضری درج کریں',
        checkOut: 'روانگی درج کریں',
        checkedIn: 'کی حاضری درج ہوئی وقت',
        checkedOut: 'کی روانگی درج ہوئی وقت',
        noChildrenFound: 'کوئی بچہ نہیں ملا'
      },
      childProfile: {
        notFound: 'بچہ نہیں ملا',
        backToOverview: 'جائزہ پر واپس جائیں',
        inSince: 'سے حاضر',
        contactInfo: 'رابطہ معلومات',
        primary: 'بنیادی',
        sendEmail: 'ای میل بھیجیں',
        quickActions: 'فوری کارروائیاں',
        editProfile: 'پروفائل میں ترمیم کریں',
        viewHistory: 'تاریخ دیکھیں'
      },
      settings: {
        title: 'سیٹنگز',
        subtitle: 'اکاؤنٹ اور ترجیحات کا انتظام کریں',
        account: 'اکاؤنٹ',
        profile: 'پروفائل',
        profileDesc: 'نام اور رابطہ معلومات میں ترمیم کریں',
        security: 'سیکیورٹی',
        securityDesc: 'پاس ورڈ اور دو مرحلہ تصدیق',
        preferences: 'ترجیحات',
        notifications: 'نوٹیفیکیشنز',
        notificationsDesc: 'نوٹیفیکیشنز اور یاد دہانیوں کا انتظام کریں',
        language: 'زبان',
        languageDesc: 'اردو',
        appearance: 'ظاہری شکل',
        appearanceDesc: 'ہلکا موڈ',
        staff: 'سٹاف',
        parent: 'والدین',
        version: 'v2.0.0'
      },
      nav: {
        overview: 'جائزہ',
        checkInOut: 'حاضری/روانگی',
        calendar: 'کیلنڈر',
        history: 'تاریخ',
        settings: 'سیٹنگز'
      },
      calendar: {
        title: 'کیلنڈر',
        subtitle: 'اہم تاریخوں پر نظر رکھیں',
        addEvent: 'ایونٹ شامل کریں',
        noEvents: 'اس دن کے لیے کوئی ایونٹ نہیں',
        eventTypes: {
          meeting: 'والدین کی میٹنگ',
          trip: 'سیر کا دن',
          holiday: 'بند / چھٹی',
          event: 'ایونٹ',
          general: 'دیگر'
        }
      },
      addChild: {
        title: 'نیا بچہ رجسٹر کریں',
        subtitle: 'بچے کی معلومات درج کریں',
        childInfo: 'بچے کی معلومات',
        childName: 'نام',
        childNamePlaceholder: 'مثال: ایما ہینسن',
        childAge: 'عمر',
        childAgePlaceholder: '٤',
        childGroup: 'گروپ',
        childGroupPlaceholder: 'مثال: چیونٹی',
        parentInfo: 'سرپرست کی معلومات',
        parentName: 'سرپرست کا نام',
        parentNamePlaceholder: 'مثال: ہیگے ہینسن',
        parentRelation: 'رشتہ',
        parentRelationPlaceholder: 'مثال: ماں',
        parentPhone: 'فون',
        parentPhonePlaceholder: '912 34 567',
        parentEmail: 'ای میل',
        parentEmailPlaceholder: 'parent@example.com',
        save: 'بچے کو محفوظ کریں',
        success: 'بچہ رجسٹر ہو گیا!',
        successMessage: '{{name}} کو سسٹم میں رجسٹر کر دیا گیا ہے۔',
        errors: {
          nameRequired: 'نام درج کرنا ضروری ہے',
          ageRequired: 'عمر درج کرنا ضروری ہے',
          ageInvalid: 'عمر ایک درست عدد ہونا چاہیے',
          parentNameRequired: 'سرپرست کا نام درج کرنا ضروری ہے',
          phoneInvalid: 'غلط فون نمبر',
          emailInvalid: 'غلط ای میل پتہ'
        }
      },
      history: {
        title: 'تاریخ',
        activities: 'سرگرمیاں',
        events: 'ایونٹس',
        checkIns: 'حاضریاں',
        checkOuts: 'روانگیاں',
        noEvents: 'اس دن کے لیے کوئی ایونٹ نہیں',
        checkedIn: '{{name}} کی حاضری {{time}} پر درج ہوئی',
        checkedOut: '{{name}} کی روانگی {{time}} پر درج ہوئی',
        created: '{{name}} کو رجسٹر کیا گیا',
        updated: '{{name}} کی معلومات اپ ڈیٹ کی گئیں',
        deleted: '{{name}} کو حذف کر دیا گیا'
      },
      loading: 'لوڈ ہو رہا ہے...',
      ok: 'ٹھیک ہے',
      relations: {
        mother: 'ماں',
        father: 'والد',
        guardian: 'سرپرست'
      }
    }
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'nb', // Standardspråk
    fallbackLng: 'nb',
    interpolation: {
      escapeValue: false,
    },
  });


// Last lagret språk fra AsyncStorage
AsyncStorage.getItem(LANGUAGE_KEY)
  .then((savedLanguage) => {
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
    }
  })
  .catch(() => {
    // Ignorer lagringsfeil
  });

export const setAppLanguage = async (language) => {
  try {
    await i18n.changeLanguage(language);
    await AsyncStorage.setItem(LANGUAGE_KEY, language);
  } catch (error) {
    console.warn('Kunne ikke oppdatere språk', error);
  }
};

export { LANGUAGE_KEY };

export default i18n;
