# WebRTC Tasks App

Тестовое задание: приложение на React с двумя страницами — список задач и видео-комната.

## 🚀 Стек
- React 18 + Vite + TypeScript  
- TailwindCSS  
- React Router v6  
- WebRTC API (камера + mute)  

## 📦 Установка и запуск

```bash
# 1. Клонировать репозиторий
git clone https://github.com/vlad-romantsev/webrtc-tasks.git
cd webrtc-tasks

# 2. Установить зависимости
npm install

# 3. Запустить dev-сервер
npm run dev
```
Приложение будет доступно по адресу:
http://localhost:5173

## Страницы
- /tasks/ — список задач (id, title, status)

- /tasks/:id — видео-комната для выбранной задачи

## Возможности
- Загрузка списка задач из mock API

- Навигация между страницами через React Router

- Отображение видео с камеры

- Кнопка включения/выключения микрофона