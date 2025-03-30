# Тестовое задание для Swarmica

- Установить версию NodeJS 23
Для Windows
```bash
# Download and install fnm:
winget install Schniz.fnm

# Download and install Node.js:
fnm install 23

# Verify the Node.js version:
node -v # Should print "v23.10.0".

# Verify npm version:
npm -v # Should print "10.9.2".
```
Для Linux
```bash
# Download and install fnm:
curl -o- https://fnm.vercel.app/install | bash

# Download and install Node.js:
fnm install 23

# Verify the Node.js version:
node -v # Should print "v23.10.0".

# Verify npm version:
npm -v # Should print "10.9.2".
```

- Установить в GoogleChrome [расширение](https://chromewebstore.google.com/detail/cors-unblock/hadoojkfknbjgoppkecpgamiajljiief) которое отключает CORS проверку, так как сервер не отдает нужные заголовки для работы на локальной машине, из-за этого API не работает как надо
- Во вкладке с расширениями включить расширение
- Скачать репозиторий любым доступным способом
- В папке репозитория выполнить команды `npm install && npm run dev`
- Открыть в браузере [локальный стенд](http://localhost:5173) `http://localhost:5173`
- Готово

Далее появится окно браузера, в котором сверху будет выбор локали, можно выбрать категорию для поиска, если не выбрать категорию, будет искать по всем категориям. Ввести в область поиска более 2х символов чтобы начался поиск. Просмотренные записи выделяются более блеклым серым цветом чтобы отличать от непросмотренных
Так же подключен плагин ReactMarkdown для правильной отрисовки страниц.

Можно добавить i18n для перевода встроенных плейсхолдеров

Не стал бить стор на сущности так как их здесь мало, да и честно говоря можно было вообще без него обойтись.
Использовал styled-components библиотеку для какой-никакой стилизации чтобы смотреть было приятно.
