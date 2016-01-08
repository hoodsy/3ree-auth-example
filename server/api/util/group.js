// Group By
// ========
// Takes an array of objects
// shaped [ { left: {}, right: {} } ]
// and creates new arrays for all left
// and right entries.
export default function (items) {
  return items.reduce((normalizedItems, item) => {
    return {
      left: [
        ...normalizedItems['left'],
        item['left']
      ],
      right: [
        ...normalizedItems['right']
        .filter(rightItem => rightItem.id !== item['right'].id),
        item['right']
      ]
    }
  }, { left: [], right: [] })
}
