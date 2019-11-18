export function trimAndFilter(items: string[]): string[] {
  return items
    .map(l => {
      return l.trim()
    })
    .filter(l => {
      return l.length > 0
    })
}
