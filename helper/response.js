const Response = function (res) {
    this.res = res
  }
  Response.prototype = {
  
    /**
     *
     * @param {Array|Object} data
     * @param {Array|Object} messages
     * @param {Integer} statusCode
     */
    success: function (data, messages = [], statusCode = 200, pagination) {
      this.res.status(statusCode).json({
        data: data,
        meta: {
          status_code: statusCode,
          type: 'success',
          success: true,
          messages: messages
        },
        pagination: pagination
      })
    },
  
    /**
     * @param {Array|Object} messages
     * @param {Integer} statusCode
     */
    failed: function (messages = [], statusCode = 401) {
      this.res.status(statusCode).json({
        meta: {
          status_code: statusCode,
          type: 'failed',
          success: false,
          messages: messages
        }
      })
    }
  
  }
  module.exports = Response
  