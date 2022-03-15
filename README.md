# bulls-and-cows

**Логическая онлайн-игра в слова
"Быки и коровы"**

<img src="https://user-images.githubusercontent.com/95147567/158383588-935ed7b7-f7a1-4670-9c07-dffe8cdcec58.gif" width="500px"/>

Задача игрока - отгадать слово, которое загадал соперник.

Приложение предлагает 3 режима игры:
1. Игра против компьютера (2 уровня сложности)
2. Битва (онлайн-игра)
3. Тренировка


<img src="https://user-images.githubusercontent.com/95147567/158393913-38cdf2b7-da22-4899-9ab7-1b833465540f.jpg" width="500px"/>

При кажущейся простоте проект оказался интересным с технической точки зрения:
* Реализована логика игры, частично на сервере, частично на клиенте. 
* На сервер загружен толковый словарь 60к+ для проверки правонаписания слов. То есть каждое введенное пользователем слово позапросно проверяется на наличие в словаре
* Режим игры онлайн с другими людьми реализован при помощи сокетов.
* Аутентификация с применением JWT.

