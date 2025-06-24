(function() {
  const isTelegram = window.Telegram && window.Telegram.WebApp;
  const isUserAgentTelegram = navigator.userAgent.includes("Telegram");

  if (!isTelegram || !isUserAgentTelegram) {
    // Удаляем всё нафиг
    document.documentElement.innerHTML = '';

    // Выводим заглушку
    document.write(`
      <html><head>
        <meta charset="UTF-8">
        <style>
          * { box-sizing: border-box; }
          body {
            background: #111;
            color: #fff;
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            text-align: center;
          }
        </style>
      </head><body>
        <div>
          <h2>🚫 Доступ запрещён</h2>
          <p>Этот миниап можно открыть <b>только через Telegram</b></p>
        </div>
      </body></html>
    `);

    // Убиваем все загрузки
    setTimeout(() => window.stop(), 50);
    throw new Error('Blocked outside Telegram');
  }
})();
