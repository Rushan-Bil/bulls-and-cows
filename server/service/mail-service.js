/* eslint-disable class-methods-use-this */
class MailService {
  async sendActivetionMail(to, link) {
    console.log('get Activation link', to, link);
  }
}
module.exports = new MailService();
