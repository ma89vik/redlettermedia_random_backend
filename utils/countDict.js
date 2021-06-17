
class CountDict {
  constructor() {
    this.items = {}
  }

  count(key) {
    if (key in this.items) {
      this.items[key]++
    } else {
      this.items[key] = 1
    }
  }

  countArray(keyArray) {
    keyArray.forEach(key => {
      this.count(key)
    })
  }

  getItems() {
    return this.items
  }
}

module.exports = {
  CountDict
}