import * as core from '@actions/core'
import * as kit from '@harveyr/github-actions-kit'

import { parseLines } from './flake8'
import { Lint } from './types'

function makeAnnotation(lint: Lint): kit.CheckRunAnnotation {
  return {
    level: 'failure',
    startLine: lint.line,
    message: lint.message,
    path: lint.filePath,
  }
}

async function run(): Promise<void> {
  const githubToken = core.getInput('github-token')
  const postAnnotations = core.getInput('post-annotations') === 'true'
  const patterns = core
    .getInput('patterns')
    .split(' ')
    .map(p => {
      return p.trim()
    })
    .filter(p => {
      return p.length > 0
    })

  const flake8Path = core.getInput('flake8-path') || 'flake8'

  let text = ''
  if (patterns.length) {
    await kit.execAndCapture(flake8Path, ['--version'])
    const { stdout, stderr } = await kit.execAndCapture(flake8Path, patterns, {
      failOnStdErr: false,
    })
    text = stdout + stderr
  }
  const lines = text.split('\n')
  const lints = parseLines(lines)

  const summary = patterns.length
    ? `flake8 found ${lints.length} issues`
    : `flake8 did not run (no patterns passed)`
  await kit.postCheckRun({
    githubToken,
    name: 'flake8',
    conclusion: lints.length ? 'failure' : 'success',
    summary,
    text,
    annotations: postAnnotations ? lints.map(makeAnnotation) : [],
  })
}

run().catch(err => {
  core.setFailed(`${err}`)
})
