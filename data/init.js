const fs = require("fs")
const readline = require("readline")

const grouped = {}

const writeSingleWordFiles = (grouped) => {
  const lens = Object.keys(grouped)
  lens.forEach(len => {
    const words = grouped[len].sort()
    const fileName = "words-" + len + ".json"
    const data = JSON.stringify(words, null, 2)
    console.log(fileName, words.length)
    fs.writeFileSync(fileName, data)
  })
}

const writeFileWithAllWords = (grouped) => {
  const lens = Object.keys(grouped)
  lens.forEach(len => {
    grouped[len] = grouped[len].sort().filter(w => /^[a-zñ]+$/.test(w))
  })
  const fileName = "words.json"
  const data = JSON.stringify(grouped, null, 2)
  fs.writeFileSync(fileName, data)
}

var lineReader = readline.createInterface({
  input: fs.createReadStream('palabras.txt')
});
lineReader.on('close', () => {
  writeFileWithAllWords(grouped)
})

lineReader.on('line', function (line) {
  const len = line.length
  if (len > 3) {
    if (!grouped[len]) grouped[len] = []
    const list = grouped[len]
    list.push(line)
  }
});
