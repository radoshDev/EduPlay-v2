import getRandomIndex from './getRandomIndex'

const generateUniqueList = <T>(list: T[], length: number): T[] => {
  list = [...new Set(list)]

  const result: Set<T> = new Set()

  while (result.size !== length) {
    const randomIndex = getRandomIndex(list.length)
    const item = list[randomIndex]

    if (list.length > length && result.has(item)) continue

    result.add(item)
  }

  return Array.from(result)
}

export default generateUniqueList
