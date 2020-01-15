class HttpError extends Error {
  constructor(message, errorCode) {
    super(message) // message property already exists in Error class
    this.code = errorCode
  }
}

export default HttpError