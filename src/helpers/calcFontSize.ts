const calcFontSize = (wordLength: number, isUpper?: boolean): string => {
  const desktopSize = Math.round(900 / wordLength)
  const sizeLookup: Record<number, string> = {
    1: `min(500px, 70vw)`,
    2: `min(400px, ${isUpper ? '53vw' : '62vw'})`,
    3: `min(${desktopSize}px, ${isUpper ? '40vw' : '45vw'})`,
    4: `min(${desktopSize}px, ${isUpper ? '30vw' : '35vw'})`,
    5: `min(${desktopSize}px, ${isUpper ? '25vw' : '30vw'})`,
    6: `min(${desktopSize}px, ${isUpper ? '21vw' : '25vw'})`,
    7: `min(${desktopSize}px, ${isUpper ? '19vw' : '22vw'})`,
    8: `min(${desktopSize}px, ${isUpper ? '17vw' : '19vw'})`,
    9: `min(${desktopSize}px, ${isUpper ? '15vw' : '17vw'})`
  }
  return sizeLookup[wordLength] || '1rem'
}

export default calcFontSize
