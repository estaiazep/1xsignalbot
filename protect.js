(function() {
  const isTelegram = window.Telegram && window.Telegram.WebApp;
  const isUserAgentTelegram = navigator.userAgent.includes("Telegram");

  if (!isTelegram || !isUserAgentTelegram) {
    // Прямо сейчас останавливаем всё
    window.stop();

    // Удаляем весь DOM и вставляем только заглушку
    document.open();
    document.write(`
      <html><head>
        <meta charset="UTF-8">
        <title>Доступ запрещён</title>
        <style>
          body {
            margin: 0;
            background: #000;
            color: #fff;
            font-family: Arial, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            text-align: center;
          }
        </style>
      </head><body>
        <div>
          <h2>🚫 Этот сайт доступен только через Telegram</h2>
          <p>Закрой браузер и открой через Telegram WebApp</p>
        </div>
      </body></html>
    `);
    document.close();
  }
})();
