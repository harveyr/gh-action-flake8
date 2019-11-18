export function trimAndFilter(items: string[]): string[] {
  return items
    .map(i => {
      return i.trim()
    })
    .filter(i => {
      return i.length > 0
    })
}
