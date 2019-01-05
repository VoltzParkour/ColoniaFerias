export default (value) => {
  if (value !== null && value !== undefined) {
    var price = value.toString();
    return 'R$ ' + [price.slice(0, price.length - 2), ',', price.slice(price.length - 2, price.length)].join('' )
  } else {
    return '0,00'
  }
}
