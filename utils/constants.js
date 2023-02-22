// const env = 'mongodb://127.0.0.1:27017/bitfilmsdb';
const dataBase = 'mongodb://127.0.0.1/bitfilmsdb';
// localhost:27017
// const dataBase = '';
const errorMessages = {
  incorrectUserData: 'Переданы некорректные данные пользователя.',
  userUniq: 'Пользовотель с введенным Email уже зарегестрирован.',
  userNotFound: 'Пользователь по указанному _id не найден.',
  loginError: 'Неправильные почта или пароль',
  unauthorized: 'Необходима авторизация',
  filmNotFound: 'Фильм с указанным _id не найден.',
  removeNotOwnerFilm: 'Вы не являетесь владельцем фильма.',
  incorrectFilmData: 'Переданы некорректные данные для удаления фильма.',
  incorrectEmail: 'Некорректный email',
  incorrectImageUrl: 'Передана некорректная ссылка картинки',
  incorrectTrailerUrl: 'Передана некорректная ссылка трейлера',
  incorrectThumbnailUrl: 'Передана некорректная ссылка постера к фильму',
  error500: 'На сервере произошла ошибка',
  error404: 'Страница по указанному маршруту не найдена',
};

module.exports = { dataBase, errorMessages };
