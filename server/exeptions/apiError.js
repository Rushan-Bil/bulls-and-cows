module.exports = class ApiError extends Error {
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiError(401, 'Пользовтаель не авторизован');
  }

  static BadREquest(message) {
    return new ApiError(400, message);
  }

  static notActiavteMail() {
    return new ApiError(400, 'Не подтверждена почта');
  }
};
