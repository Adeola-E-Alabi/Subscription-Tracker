const object = {
    name: 'Ahmed',
    size: 'Big',
    pet:'cat'
}
today = new Date().toDateString()
object[today] = today
console.log(object[today])