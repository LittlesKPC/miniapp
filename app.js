// Инициализация SDK
const tg = window.Telegram.WebApp;

// Адаптация темы
tg.expand(); // разворачивает на всю высоту
tg.setHeaderColor("secondary_bg_color"); // мягкий цвет заголовка
tg.MainButton.setText("Отправить заявку");
tg.MainButton.show();

function getFormData() {
  const name = document.getElementById("name").value.trim();
  const activity = document.getElementById("activity").value;
  const comment = document.getElementById("comment").value.trim();
  return { name, activity, comment };
}

// Валидация и отправка данных обратно в бота
tg.MainButton.onClick(() => {
  const payload = getFormData();
  if (!payload.name) {
    tg.HapticFeedback.notificationOccurred("error");
    tg.showAlert("Пожалуйста, укажите имя");
    return;
  }
  // Отправляем строку в бот (он получит update с web_app_data)
  tg.sendData(JSON.stringify(payload));
  tg.HapticFeedback.notificationOccurred("success");
  tg.close(); // закрываем мини-апп
});

// Реакция на смену темы/цветов
Telegram.WebApp.onEvent("themeChanged", () => {
  document.body.style.background = getComputedStyle(document.documentElement)
    .getPropertyValue("--tg-theme-bg-color");
});
