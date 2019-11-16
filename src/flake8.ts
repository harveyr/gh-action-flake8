import * as core from '@actions/core'

const MATCHER = /(\S+):(\d+):(\d+): ([A-Z]\d+) (.+)/

import { Lint } from './types'

export function parseLine(line: string): Lint | null {
  const match = MATCHER.exec(line)
  if (!match || match.length < 2) {
    return null
  }

  return {
    filePath: match[1],
    line: parseInt(match[2], 10),
    column: parseInt(match[3], 10),
    code: match[4],
    message: match[5],
  }
}

export function parseLines(lines: string[]): Lint[] {
  const result: Lint[] = []
  for (const line of lines) {
    const lint = parseLine(line)
    if (lint) {
      result.push(lint)
    } else {
      core.warning(`Unexpected line: ${line}`)
    }
  }
  return result
}
