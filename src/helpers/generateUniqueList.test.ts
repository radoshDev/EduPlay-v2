import { it, describe, expect } from 'vitest'
import generateUniqueList from './generateUniqueList'

describe('#generateUniqueList', () => {
  it('returns not unique list when its length is equal to or smaller than the requested length', () => {
    const list = [1, 2, 3]
    const result = generateUniqueList(list, 3)
    expect(result.length).toEqual(3)

    const result2 = generateUniqueList(list, 4)
    expect(result2.length).toEqual(4)
  })

  it('returns a list with unique items', () => {
    const list = [1, 2, 3, 4, 5]
    const length = 3
    const result = generateUniqueList(list, length)

    expect(result).toHaveLength(length)
    expect(result.every((item) => list.includes(item))).toBe(true)
    expect(new Set(result)).toHaveLength(length)
  })

  it('returns an empty array when the input list is empty', () => {
    const list: number[] = []
    const result = generateUniqueList(list, 3)

    expect(result).toHaveLength(0)
  })
})
