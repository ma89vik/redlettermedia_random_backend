const { CountDict } = require('../utils/countDict')

describe('Count dictonary', () => {
  test('create dictonary', () => {
    new CountDict()
  })

  test('single item', () => {
    const d = new CountDict()
    d.count('test')

    const res = d.getItems()
    expect(res.test).toBe(1)
  })

  test('Count several items', () => {
    const test_items = ['test_str1', 'test_str1', 'test_str2']

    const d = new CountDict()

    test_items.forEach( e => d.count(e))

    const res = d.getItems()
    expect(res.test_str1).toBe(2)
    expect(res.test_str2).toBe(1)
  })

  test('Count array', () => {
    const test_items = ['test_str1', 'test_str1', 'test_str2']

    const d = new CountDict()

    d.countArray(test_items)
    const res = d.getItems()

    expect(res.test_str1).toBe(2)
    expect(res.test_str2).toBe(1)
  })
})