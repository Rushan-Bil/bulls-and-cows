module.exports = class UserDto {
  constructor(model) {
    this.email = model.email;
    this.id = model.id;
    this.isActivated = true;
  }
};