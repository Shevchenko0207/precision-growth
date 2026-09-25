import { CustomerProfile, RFMSegmentSummary, OverallKPIs, FunnelEmailStep, AdCreativeVariant } from '../types';

export const initialKPIs: OverallKPIs = {
  roasCurrent: 2.8,
  roasTarget: 4.2,
  cacCurrent: 24.50,
  cacTarget: 19.60, // -20%
  emailRepeatRateCurrent: 14.8,
  emailRepeatRateTarget: 32.0, // >30%
  aovCurrent: 1850, // UAH
  aovTarget: 2072 // +12%
};

export const rfmSegmentSummaries: RFMSegmentSummary[] = [
  {
    segment: 'VIP',
    count: 342,
    avgRecency: 12,
    avgFrequency: 6.4,
    avgMonetary: 14200,
    targetGoal: 'Утримання та стимулювання сарафанного радіо (Referral)',
    recommendedAction: 'Ексклюзивний ранній доступ до нових колекцій, бали лояльності, персональний стиліст.'
  },
  {
    segment: 'Active',
    count: 850,
    avgRecency: 28,
    avgFrequency: 3.1,
    avgMonetary: 5800,
    targetGoal: 'Збільшення середнього чека (AOV) через Cross-Sell',
    recommendedAction: 'Комплектні пропозиції (Lookbook Bundles), поріг безкоштовної доставки від 2500 грн.'
  },
  {
    segment: 'At-Risk',
    count: 410,
    avgRecency: 55,
    avgFrequency: 2.2,
    avgMonetary: 4100,
    targetGoal: 'Запобігання відтоку та стимулювання повторної покупки',
    recommendedAction: 'Автоматичне нагадування "Оновлення гардероба 60 днів" з промокодом на -15%.'
  },
  {
    segment: 'Sleeping',
    count: 620,
    avgRecency: 110,
    avgFrequency: 1.1,
    avgMonetary: 1900,
    targetGoal: 'Реактивація клієнтів (Re-engagement)',
    recommendedAction: 'Опитування про причин призупинення покупки + спецпропозиція з таймером.'
  },
  {
    segment: 'Newbie',
    count: 280,
    avgRecency: 8,
    avgFrequency: 1.0,
    avgMonetary: 1650,
    targetGoal: 'Конверсія в другу покупку протягом 30 днів',
    recommendedAction: 'Onboarding серія листів з гідом по догляду за речами та кешбеком на 2-гу покупку.'
  }
];

export const sampleCustomers: CustomerProfile[] = [
  { id: 'CUST-101', name: 'Олена Коваленко', email: 'olena.k@gmail.com', recencyDays: 5, frequencyOrders: 8, monetarySpend: 18400, rfmSegment: 'VIP', lastCategory: 'Верхній одяг', churnProbability: 4 },
  { id: 'CUST-102', name: 'Андрій Шевченко', email: 'a.shevchenko@ukr.net', recencyDays: 14, frequencyOrders: 5, monetarySpend: 11200, rfmSegment: 'VIP', lastCategory: 'Взуття', churnProbability: 8 },
  { id: 'CUST-103', name: 'Марія Бойко', email: 'm.boyko@yahoo.com', recencyDays: 22, frequencyOrders: 3, monetarySpend: 6200, rfmSegment: 'Active', lastCategory: 'Аксесуари', churnProbability: 18 },
  { id: 'CUST-104', name: 'Максим Кравченко', email: 'max.krav@gmail.com', recencyDays: 31, frequencyOrders: 3, monetarySpend: 5400, rfmSegment: 'Active', lastCategory: 'Джинси', churnProbability: 25 },
  { id: 'CUST-105', name: 'Ірина Мельник', email: 'i.melnyk@gmail.com', recencyDays: 58, frequencyOrders: 2, monetarySpend: 4300, rfmSegment: 'At-Risk', lastCategory: 'Сукні', churnProbability: 62 },
  { id: 'CUST-106', name: 'Сергій Ткаченко', email: 'serg.tk@i.ua', recencyDays: 64, frequencyOrders: 2, monetarySpend: 3900, rfmSegment: 'At-Risk', lastCategory: 'Сорочки', churnProbability: 71 },
  { id: 'CUST-107', name: 'Оксана Бондар', email: 'o.bondar@gmail.com', recencyDays: 115, frequencyOrders: 1, monetarySpend: 1850, rfmSegment: 'Sleeping', lastCategory: 'Футболки', churnProbability: 89 },
  { id: 'CUST-108', name: 'Дмитро Поліщук', email: 'd.polish@gmail.com', recencyDays: 122, frequencyOrders: 1, monetarySpend: 2100, rfmSegment: 'Sleeping', lastCategory: 'Спортивний одяг', churnProbability: 92 },
  { id: 'CUST-109', name: 'Вікторія Лисенко', email: 'vica.lysenko@gmail.com', recencyDays: 4, frequencyOrders: 1, monetarySpend: 1750, rfmSegment: 'Newbie', lastCategory: 'Светри', churnProbability: 15 },
  { id: 'CUST-110', name: 'Олександр Сидоренко', email: 'alex.sydor@gmail.com', recencyDays: 9, frequencyOrders: 1, monetarySpend: 1500, rfmSegment: 'Newbie', lastCategory: 'Аксесуари', churnProbability: 22 }
];

export const sampleAbandonedCartFunnel: FunnelEmailStep[] = [
  {
    id: 'F-1',
    stepNumber: 1,
    delayHours: 1,
    channel: 'Email',
    subject: 'Ваші обрані моделі чекають у кошику 🛒',
    preheader: 'Ми зарезервували ваші розміри на 24 години.',
    dynamicOffer: 'Безкоштовна доставка при оформленні зараз',
    bodySnippet: 'Привіт! Ви залишили чудові речі у кошику. Вони ще доступні в наявності, але попит високий...'
  },
  {
    id: 'F-2',
    stepNumber: 2,
    delayHours: 24,
    channel: 'SMS',
    subject: 'Персональна знижка -10%',
    preheader: 'Код CART10 зарезервовано на 12 годин',
    dynamicOffer: 'Знижка 10% за промокодом CART10',
    bodySnippet: 'Отримайте 10% знижки на ваше замовлення! Використайте код CART10 на етапі чек-ауту.'
  },
  {
    id: 'F-3',
    stepNumber: 3,
    delayHours: 48,
    channel: 'Email',
    subject: 'Останній шанс: знижка піднімається до -15% ⏳',
    preheader: 'Ваш кошик буде очищено через 6 годин.',
    dynamicOffer: 'Максимальна знижка -15% + подарунок до замовлення',
    bodySnippet: 'Ми зробили вам максимально вигідні умови! Останній шанс забрати стильні новинки за вигідною ціною...'
  }
];

export const sampleAdCreatives: AdCreativeVariant[] = [
  {
    id: 'AD-1',
    segmentTarget: 'VIP',
    platform: 'Meta Ads',
    headline: 'Преміум колекція — Ексклюзивний ранній доступ',
    primaryText: 'Як для нашого постійного клієнта: відкриваємо закритий продаж нової лінійки капсульного гардеробу зі знижкою 20% до офіційного релізу.',
    ctaText: 'Отримати доступ',
    visualConcept: 'Відео-огляд тканини з високою деталізацією + естетичний Lookbook slider',
    targetROAS: 5.2
  },
  {
    id: 'AD-2',
    segmentTarget: 'At-Risk',
    platform: 'Google PMax',
    headline: 'Повернулися? Спеціальний подарунок на вас чекає!',
    primaryText: 'Давно не бачилися! Забирайте бонус 300 грн на будь-яку покупку з нової осінньо-зимової колекції.',
    ctaText: 'Забрати бонус',
    visualConcept: 'Інфографіка з порівнянням нових моделей та акцентною кнопкою вигоди',
    targetROAS: 3.8
  },
  {
    id: 'AD-3',
    segmentTarget: 'Active',
    platform: 'Meta Ads',
    headline: 'Зберіть свій ідеальний сет та заощаджуйте 25%',
    primaryText: 'Купуйте джинси + сорочку і отримуйте 25% знижки на другий товар у чеку. Встигніть оновити базовий гардероб.',
    ctaText: 'Зібрати сет',
    visualConcept: 'UGC Відео-розпаковка від популярного українського блогера з приміркою',
    targetROAS: 4.5
  }
];
