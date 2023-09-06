import getRandomIndex from './getRandomIndex'

const generateUniqueList = <T>(list: T[], length: number): T[] => {
  if (list.length === 0) return []

  const result: T[] = []

  while (result.length !== length) {
    const randomIndex = getRandomIndex(list.length)
    const item = list[randomIndex]

    if (list.length > length && result.indexOf(item) >= 0) continue

    result.push(item)
  }

  return result
}

generateUniqueList([1, 2, 3], 2)

export default generateUniqueList
