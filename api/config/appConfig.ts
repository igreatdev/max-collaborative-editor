class AppConfig {
  static instance;
  fillable = ['baseUrl'];
  projectName = 'DocTest API';
  uploadDir = './public/uploads/';
  baseUrl = '';
  serverEnv = process.env.SERVER_ENV || 'dev';
  isLive = this.serverEnv === 'live' ? true : false;

  /**
   *
   */
  static getInstance(): AppConfig {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig();
    }
    return AppConfig.instance;
  }

  set(property, value) {
    if (!this.fillable.includes(property)) {
      return false;
    }
    this[property] = value;

    return true;
  }
}

export default AppConfig.getInstance();
