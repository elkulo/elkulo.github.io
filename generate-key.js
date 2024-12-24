const md5 = require('md5')

// APIを指定.
module.exports = {
  _date: new Date(),
  _format(n) {
    return n < 10 ? '0' + n : n.toString()
  },
  year() {
    return this._date.getFullYear().toString()
  },
  month() {
    return this._format(this._date.getMonth() + 1)
  },
  day() {
    return this._format(this._date.getDate())
  },
  hour() {
    return this._format(this._date.getHours())
  },
  min() {
    return this._format(this._date.getMinutes())
  },
  url(API_URL, API_KEY, API_SALT) {
    return `${API_URL}?key=${md5(
      this.year() +
        this.month() +
        this.day() +
        this.hour() +
        this.min() +
        API_KEY +
        API_SALT,
    )}`
  },
}
