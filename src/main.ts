import * as core from '@actions/core'
import * as kit from '@harveyr/github-actions-kit'

async function run(): Promise<void> {
  const patterns = core
    .getInput('patterns')
    .split(' ')
    .map(p => {
      return p.trim()
    })
    .filter(p => {
      return p.length > 0
    })

  let output = ''
  if (patterns.length) {
    const { stdout, stderr } = await kit.execAndCapture('flake8', patterns)
    output = stdout + stderr
  }
  const lines = output.split('\n')
}

run().catch(err => {
  core.setFailed(`${err}`)
})
