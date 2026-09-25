import { GoogleGenAI } from '@google/genai';
import { RFMSegmentType, FunnelEmailStep, AdCreativeVariant, CustomerProfile } from '../types';

// Read API key from environment variable if present
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';

let aiInstance: GoogleGenAI | null = null;
if (apiKey) {
  try {
    aiInstance = new GoogleGenAI({ apiKey });
  } catch (e) {
    console.warn('Could not initialize GoogleGenAI with key:', e);
  }
}

/**
 * AI Funnel Trigger Generator
 */
export async function generateAIFunnelStep(
  segment: RFMSegmentType,
  channel: 'Email' | 'SMS',
  stepNumber: number,
  targetGoal: string
): Promise<FunnelEmailStep> {
  const prompt = `Ви — провідний експерт з performance-маркетингу та CRM-воронок.
Створіть висококонверсійний крок тригерної розсилки для сегмента клієнтів "${segment}".
Канал: ${channel}. Крок №${stepNumber}. Мета: ${targetGoal}.

Поверніть відповідь у форматованому JSON об'єкті з такими полями:
- subject: короткий заголовок листa або перший рядок SMS (до 60 символів, з емодзі)
- preheader: прехедер листа чи доповнення (до 90 символів)
- dynamicOffer: чітка вигода чи знижка (наприклад: "Знижка 15% за кодом WARDROBE15")
- bodySnippet: переконливий текст розсилки українською мовою (2-3 речення з закликом до дії)`;

  if (aiInstance) {
    try {
      const response = await aiInstance.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });
      if (response.text) {
        const parsed = JSON.parse(response.text);
        return {
          id: `AI-F-${Date.now()}`,
          stepNumber,
          delayHours: stepNumber === 1 ? 2 : stepNumber * 24,
          channel,
          subject: parsed.subject || `Персональна пропозиція для ${segment}`,
          preheader: parsed.preheader || 'Не пропустіть вигідне оновлення',
          dynamicOffer: parsed.dynamicOffer || 'Спеціальні умови клієнта',
          bodySnippet: parsed.bodySnippet || 'Дякуємо, що ви з нами! Ми підготували для вас дещо особливе.'
        };
      }
    } catch (err) {
      console.warn('Gemini API call failed, using intelligent generator fallback:', err);
    }
  }

  // Intelligent fallback offline generator
  return generateFallbackFunnelStep(segment, channel, stepNumber, targetGoal);
}

/**
 * AI Ad Copy Generator
 */
export async function generateAIAdVariant(
  segment: RFMSegmentType,
  platform: 'Meta Ads' | 'Google PMax' | 'TikTok Ads'
): Promise<AdCreativeVariant> {
  const prompt = `Створіть креативне рекламне оголошення для ${platform} під сегмент "${segment}".
Мова: українська.
Дайте відповідь у JSON формату:
- headline: привабливий заголовок (до 40 символів)
- primaryText: рекламний текст із закликом до дії та акцентом на вигоду (до 150 символів)
- ctaText: заклик до дії на кнопці (наприклад: "Купити зі знижкою", "Отримати бонус")
- visualConcept: опис візуального ряду чи відео-концепту для дизайнера`;

  if (aiInstance) {
    try {
      const response = await aiInstance.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      if (response.text) {
        const parsed = JSON.parse(response.text);
        return {
          id: `AI-AD-${Date.now()}`,
          segmentTarget: segment,
          platform,
          headline: parsed.headline || 'Спеціальна пропозиція',
          primaryText: parsed.primaryText || 'Отримайте додаткову вигоду на ваше наступне замовлення.',
          ctaText: parsed.ctaText || 'Дізнатися більше',
          visualConcept: parsed.visualConcept || 'Динамічне відео з демонстрацією продукту',
          targetROAS: segment === 'VIP' ? 5.1 : 4.0
        };
      }
    } catch (err) {
      console.warn('Gemini API call failed, using fallback ad copy:', err);
    }
  }

  return generateFallbackAdVariant(segment, platform);
}

/**
 * AI Customer Churn & Retention Analyst
 */
export async function analyzeCustomerStrategy(customer: CustomerProfile): Promise<string> {
  const prompt = `Проаналізуйте профіль клієнта:
Ім'я: ${customer.name}
Сегмент RFM: ${customer.rfmSegment}
Остання покупка: ${customer.recencyDays} днів тому
Загалом замовлень: ${customer.frequencyOrders}
Сума покупок: ${customer.monetarySpend} грн
Ймовірність відтоку: ${customer.churnProbability}%

Надайте 2 короткі стратегічні поради українською мовою: як зменшити Churn Risk та збільшити LTV для цього клієнта.`;

  if (aiInstance) {
    try {
      const response = await aiInstance.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt
      });
      if (response.text) {
        return response.text;
      }
    } catch (e) {
      console.warn('Gemini API error:', e);
    }
  }

  return `💡 Порада для ${customer.name}: З огляду на ${customer.recencyDays} днів без покупок та сегмент ${customer.rfmSegment}, рекомендується тригерна розсилка з персоніфікованою вибіркою категорії "${customer.lastCategory}" та бонусом на наступну покупку протягом 7 днів.`;
}

/**
 * Marketing Copilot AI Chat Assistant
 */
export async function askCopilot(question: string, history: string[]): Promise<string> {
  const prompt = `Ви — AI Copilot для системи Precision Growth (Performance-маркетинг та воронки продажів).
Ви відповідаєте українською мовою чітко, професійно та з опирою на ключові показники: CAC, LTV, ROAS, RFM-сегментацію та тригерні e-mail/SMS воронки.

Запитання користувача: "${question}"`;

  if (aiInstance) {
    try {
      const response = await aiInstance.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt
      });
      if (response.text) return response.text;
    } catch (e) {
      console.warn('Gemini API error in copilot:', e);
    }
  }

  // Smart fallback matching question intent
  const qLower = question.toLowerCase();
  if (qLower.includes('cac') || qLower.includes('вартість')) {
    return '📉 Для зниження CAC на 20% ми рекомендуємо: 1) Впровадити сувору RFM-сегментацію для виключення вигорання аудиторії; 2) Перенаправити бюджет у Meta Ads на LAL-аудиторії (Lookalike 1%) від сегмента VIP; 3) Автоматизувати покинутий кошик через 3-крокову серію в Klaviyo.';
  }
  if (qLower.includes('ltv') || qLower.includes('повторн')) {
    return '🚀 Для збільшення LTV на 25% ключем є ретеншн-воронки: автоматичний сценарій "Оновлення гардероба" через 60 днів після покупки, програма лояльності для VIP-клієнтів та персоналізовані крос-сейл добірки за 14 днів після доставки.';
  }
  if (qLower.includes('roas')) {
    return '📊 Зростання ROAS з 2.8x до 4.2x досягається за рахунок динамічного тестування 10+ рекламних креативів у Meta/PMax під кожен RFM-сегмент окремо замість загальних масових кампаній.';
  }

  return '💡 У системі Precision Growth ви можете автоматично розраховувати RFM-матрицю, генерувати тригерні воронки під конкретний сегмент та тестувати A/B креативи для Meta Ads і Google PMax з метою оптимізації CAC та зростання LTV.';
}

// Fallback generator functions
function generateFallbackFunnelStep(segment: RFMSegmentType, channel: string, stepNumber: number, goal: string): FunnelEmailStep {
  const isEmail = channel === 'Email';
  const subjects: Record<RFMSegmentType, string[]> = {
    VIP: ['🌟 Таємний закритою продаж лише для вас', 'Ексклюзивний презент до вашого статусу VIP'],
    Active: ['Вам пасуватиме ця новинка! 👕', 'Зберіть свій ідеальний комплект з вигодою'],
    'At-Risk': ['Ми сумуємо за вами! Спеціальний бонус всередині 🎁', 'Оновіть свій гардероб зі знижкою 15%'],
    Sleeping: ['Ви ще з нами? Отримайте 300 грн на покупку ⏳', 'Останнє нагадування про вашу спеціальну вигоду'],
    Newbie: ['Ласкаво просимо! Ваша перша скидка на 2-ге замовлення 🎁', 'Як доглядати за вашими новими речами + бонус']
  };

  const list = subjects[segment] || subjects.Active;
  const subject = isEmail ? list[(stepNumber - 1) % list.length] : `Знижка -15% за кодом SPECIAL15 лише 48 год!`;

  return {
    id: `FB-${Date.now()}`,
    stepNumber,
    delayHours: stepNumber === 1 ? 2 : stepNumber * 24,
    channel: channel as any,
    subject,
    preheader: 'Персональна пропозиція розроблена AI під ваші вподобання',
    dynamicOffer: segment === 'VIP' ? 'Ранній доступ + 20% балами' : 'Знижка -15% на замовлення від 1500 грн',
    bodySnippet: `Привіт! Оскільки ви належите до групи ${segment}, ми підготували особливі умови. Наша мета — ${goal}. Оформіть замовлення зараз!`
  };
}

function generateFallbackAdVariant(segment: RFMSegmentType, platform: 'Meta Ads' | 'Google PMax' | 'TikTok Ads'): AdCreativeVariant {
  return {
    id: `FB-AD-${Date.now()}`,
    segmentTarget: segment,
    platform,
    headline: `Спеціально для ${segment}: Трендові новинки 2026`,
    primaryText: `Отримуйте персональні бонуси та добірку кращих моделей під ваш стиль. Доставка по всій Україні за 1-2 дні.`,
    ctaText: 'Перейти в каталог',
    visualConcept: 'Динамічне відео 9:16 з демонстрацією товару на моделі та покроковим закликом',
    targetROAS: 4.2
  };
}
