export interface Lint {
  filePath: string
  line: number
  column: number
  code: string
  message: string
}
