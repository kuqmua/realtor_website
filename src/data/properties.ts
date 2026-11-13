import type { Property } from "../types/content";
import illustration from "../assets/property-demo.svg";

// Все объявления вымышлены для проверки макета. Замените данными владельца.
const examples: Omit<Property, "published" | "demo" | "images">[] = [
  {
    id: "demo-flat-001",
    title: "Двухкомнатная квартира с просторной кухней",
    kind: "apartment",
    locality: "Чебоксары",
    priceRub: 6200000,
    areaM2: 56,
    rooms: 2,
    floor: 4,
    floorsTotal: 9,
    description:
      "Светлая квартира с отдельными комнатами и просторной кухней. Демонстрационный пример описания.",
  },
  {
    id: "demo-flat-002",
    title: "Однокомнатная квартира в новом доме",
    kind: "apartment",
    locality: "Чебоксары",
    priceRub: 4100000,
    areaM2: 38,
    rooms: 1,
    floor: 7,
    floorsTotal: 16,
    description:
      "Квартира с лоджией и местом для хранения. Демонстрационный пример для проверки карточки.",
  },
  {
    id: "demo-flat-003",
    title: "Трёхкомнатная квартира для семьи",
    kind: "apartment",
    locality: "Новочебоксарск",
    priceRub: 7300000,
    areaM2: 78,
    rooms: 3,
    floor: 3,
    floorsTotal: 10,
    description:
      "Три отдельные комнаты и большая прихожая. Условное предложение для просмотра дизайна.",
  },
  {
    id: "demo-house-001",
    title: "Загородный дом с участком",
    kind: "house",
    locality: "Чувашия",
    priceRub: 9800000,
    areaM2: 120,
    landAreaM2: 600,
    description:
      "Двухэтажный дом и участок для отдыха. Характеристики приведены как пример.",
  },
  {
    id: "demo-house-002",
    title: "Одноэтажный дом с террасой",
    kind: "house",
    locality: "Чувашия",
    priceRub: 8500000,
    areaM2: 96,
    landAreaM2: 1000,
    description:
      "Дом с тремя спальнями и выходом на террасу. Это демонстрационная карточка.",
  },
  {
    id: "demo-land-001",
    title: "Участок для строительства дома",
    kind: "land",
    locality: "Чувашия",
    priceRub: 1800000,
    areaM2: 800,
    landAreaM2: 800,
    description:
      "Условный участок площадью восемь соток. Назначение и коммуникации необходимо уточнять по реальным документам.",
  },
  {
    id: "demo-land-002",
    title: "Просторный загородный участок",
    kind: "land",
    locality: "Чувашия",
    priceRub: 2400000,
    areaM2: 1200,
    landAreaM2: 1200,
    description: "Демонстрационный пример участка площадью двенадцать соток.",
  },
  {
    id: "demo-commercial-001",
    title: "Помещение для вашего бизнеса",
    kind: "commercial",
    locality: "Чебоксары",
    priceRub: 7500000,
    areaM2: 90,
    purpose: "Свободное назначение",
    description:
      "Условное помещение с отдельным входом. Все данные требуют замены перед публикацией.",
  },
  {
    id: "demo-commercial-002",
    title: "Небольшой офис",
    kind: "commercial",
    locality: "Новочебоксарск",
    priceRub: 3200000,
    areaM2: 44,
    purpose: "Офис",
    description:
      "Демонстрационный вариант офисного помещения для проверки отображения назначения.",
  },
  {
    id: "demo-flat-004",
    title: "Квартира с большой гостиной",
    kind: "apartment",
    locality: "Чебоксары",
    priceRub: 5700000,
    areaM2: 52.5,
    rooms: 2,
    floor: 5,
    floorsTotal: 5,
    description:
      "Условная квартира с отдельной спальней и гостиной. Не является реальным предложением.",
  },
];
export const properties: Property[] = examples.map((p) => ({
  ...p,
  published: true,
  demo: true,
  description: `${p.description} Цена и изображение условные. Это не предложение о продаже.`,
  images: [
    {
      src: illustration,
      alt: "Условная иллюстрация дома, не фотография объекта",
      width: 800,
      height: 600,
    },
  ],
}));
