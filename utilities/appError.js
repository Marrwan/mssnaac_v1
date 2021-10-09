class AppError extends Error {
  constructor(message, status) {
    super();
    this.message = message;
    this.status = status ? status : 500;
    if(process.env.NODE_ENV == "development"){
      console.log(this.message)
    }
  }
}

module.exports = AppError;
