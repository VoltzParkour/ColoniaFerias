export default (value) => {
  let date = new Date(value)
  return date.getDate() + 1
}
