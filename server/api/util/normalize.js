// Normalizer
// ==========
// Takes an array of items and
// maps them to a byId object
// of shape: { id: item, ... }
export default function (items) {
  return items.reduce((normalizedItems, item) => {
    normalizedItems[item.id] = item
    return normalizedItems
  }, {})
}
