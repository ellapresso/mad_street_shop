const moment = require("moment");

/**
 * 로그에 시간 추가
 * @param {String} msg 메시지
 * @param {String} type 로그 타입 (log, error, debug...)
 */
const logger = {
  log: (msg) => {
    console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${msg}`);
  },
  error: (msg) => {
    console.error(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${msg}`);
  },
  debug: (msg) => {
    if (global.__mode !== "dev") return;
    console.debug(`[DEBUG] [${moment().format("YYYY-MM-DD HH:mm:ss")}] ${msg}`);
  },
};
module.exports.logger = logger;
