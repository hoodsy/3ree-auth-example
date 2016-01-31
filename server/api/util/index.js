import _ from 'lodash'

export const SOFT_DURABILITY = { durability: 'soft' }

// Normalize
// ==========
// Takes an array of items and
// maps them to a byId object
// of shape: { id: item, ... }
export function normalize(items) {
  return items.reduce((normalizedItems, item) => {
    normalizedItems[item.id] = item
    return normalizedItems
  }, {})
}

export function extractByType(items) {
  return items.reduce((normalizedItems, item) => {
    return {
      lists: [
        ...normalizedItems['lists'],
        item['list']
      ],
      resources: [
        ...normalizedItems['resources'],
        ...item['resources']
      ]
    }
  }, { lists: [], resources: [] })
}

export function merge(items) {
  return items.reduce((normalizedItems, item) => {
    return {
      dashboards: [
        ...normalizedItems['dashboards'],
        item['dashboards']
      ],
      lists: [
        ...normalizedItems['lists'],
        ...item['lists']
      ],
      resources: [
        ...normalizedItems['resources'],
        ...item['resources']
      ]
    }
  }, { dashboards: [], lists: [], resources: [] })
}

// Group
// =====
// Takes an array of objects
// shaped [ { left: {}, right: {} } ]
// and creates new arrays for all left
// and right entries.
export function group(items) {
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

export function extractIds(arr) {
  return _.map(arr, _.property('id'))
}
