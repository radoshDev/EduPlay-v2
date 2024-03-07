export function sortByDate(a: string, b: string) {
  // Convert date strings to Date objects
  const dateA = new Date(
    parseInt(a.substring(6, 10)),
    parseInt(a.substring(3, 5)) - 1,
    parseInt(a.substring(0, 2))
  )
  const dateB = new Date(
    parseInt(b.substring(6, 10)),
    parseInt(b.substring(3, 5)) - 1,
    parseInt(b.substring(0, 2))
  )

  // Compare dates
  return dateA.getTime() - dateB.getTime()
}
