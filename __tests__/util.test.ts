import { trimAndFilter } from '../src/util'

test('trim and filter', () => {
  expect(trimAndFilter(['a'])).toEqual(['a'])
  expect(trimAndFilter(['a '])).toEqual(['a'])
  expect(trimAndFilter(['  a  '])).toEqual(['a'])
  expect(trimAndFilter(['  a  ', 'b ', '   ', '', 'c'])).toEqual([
    'a',
    'b',
    'c',
  ])
})
