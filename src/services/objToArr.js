export default (obj) => {
  const temp = []
  Object.keys(obj).forEach(e => {
    temp.push({ ...obj[e], id: e })
  })
  return temp
}
