export const authMenu = [
  { id: 1, title: 'Против компьютера', link: '/game/company' },
  { id: 2, title: 'Битва', link: '/game/prepare' },
  { id: 3, title: 'Тренировка', link: '/game/train' },
  { id: 4, title: 'Правила', link: '/rules' },
  { id: 5, title: 'Таблица лидеров', link: '/ratings' },
];
export const noAuthMenu = [
  { id: 1, title: 'Против компьютера', link: '/game/company' },
  { id: 3, title: 'Тренировка', link: '/game/train' },
  { id: 4, title: 'Правила', link: '/rules' },
];

export const SERVER_URL = 'http://localhost:3001';
export const alphabets = {
  en: 'qwertyuiopasdfghjklzxcvbnm'.split('').sort(),
  ru: 'йцукеёнгшщзхъфывапролджэячсмитьбю'.split('').sort(),
};
