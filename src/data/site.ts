export const site = {
  name: "Елена Сергеевна Левошина",
  title: "Риелтор в Чебоксарах — Елена Левошина",
  description:
    "Личная помощь с покупкой и продажей недвижимости, одобрением ипотеки и сопровождением сделки. Чебоксары, Новочебоксарск и Чувашия.",
  // Тестовые реквизиты. Перед публикацией замените и проверьте каждый контакт.
  phone: "+79990000000",
  phoneDisplay: "+7 (999) 000-00-00",
  email: "elena@example.invalid",
  messengers: [
    { name: "MAX", url: "https://max.ru/example-demo" },
    { name: "WhatsApp", url: "https://wa.me/79990000000" },
    { name: "Telegram", url: "https://t.me/example_demo_realtor" },
  ] as { name: string; url: string }[],
  origin: "https://realtor.example.invalid",
  approved: false,
  directContactsApproved: false,
  hours: "Звонки с 10:00 до 20:00 по московскому времени",
  geography:
    "Лично — Чебоксары, Новочебоксарск и Чувашия. Москва и область — дистанционно. Дистанционная помощь доступна по России.",
};
