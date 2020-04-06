export default function sortByName(obj) {
  return obj.sort((a, b) =>
    a.name.split(' ')[1] > b.name.split(' ')[1] ? 1 : -1
  )
}
