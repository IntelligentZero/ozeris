module.exports = {
  name: "error",
  execute(err) {
    if (err.code === 1006) {
      return
    } else {
      console.log(err)
    }
  }
}