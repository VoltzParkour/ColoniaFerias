export default (value) => {
  let date = new Date(value)
  return date.getUTCDate()
}
