import { parseLine } from '../src/flake8'

test('parse lint', async () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const lint = parseLine(
    "bling/blang/management/commands/csv.py:73:21: F821 undefined name 'Fondu'",
  )!
  expect(lint.filePath).toEqual('bling/blang/management/commands/csv.py')
  expect(lint.line).toEqual(73)
  expect(lint.column).toEqual(21)
  expect(lint.code).toEqual('F821')
  expect(lint.message).toEqual("undefined name 'Fondu'")
})
