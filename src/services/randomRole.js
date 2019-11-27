export default (num) => {
  let roles = [
    [ 'good', 'good', 'good', 'bad', 'bad' ],
    [ 'good', 'good', 'good', 'good', 'bad', 'bad' ],
    [ 'good', 'good', 'good', 'good', 'bad', 'bad', 'bad' ],
    [ 'good', 'good', 'good', 'good', 'good', 'bad', 'bad', 'bad' ],
    [ 'good', 'good', 'good', 'good', 'good', 'good', 'bad', 'bad', 'bad' ],
    [ 'good', 'good', 'good', 'good', 'good', 'good', 'bad', 'bad', 'bad', 'bad' ]
  ]
  if (num < 5 || num > 10) {
    return false
  }
  return roles[num - 5].sort(() => Math.random() - 0.5)
}
