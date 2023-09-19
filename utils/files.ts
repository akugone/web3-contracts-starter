import fs from 'fs'

export const loadJSON = (filename: string) => {
  return fs.existsSync(filename) ? fs.readFileSync(filename).toString() : '{}'
}

export const saveJSON = (filename: string, json: string) => {
  return fs.writeFileSync(filename, JSON.stringify(json, null, 2))
}
