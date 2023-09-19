import { Network } from '../scripts/config'


const getFilename = (network: Network) => `${__dirname}/talent.config_${network}.json`

export enum ConfigProperty {
  Storage = 'storage',

}



export const get = (network: Network, property: ConfigProperty) => {
  const obj = JSON.parse(loadJSON(network))
  return obj[property] || 'Not found'
}

export const getConfig = (network: any) => {
  const obj = JSON.parse(loadJSON(network))
  return obj || 'Not found'
}

export const set = (network: Network, property: ConfigProperty, value: string) => {
  const obj = JSON.parse(loadJSON(network) || '{}')
  obj[property] = value
  saveJSON(network, obj)
}

export const remove = (network: Network, property: ConfigProperty) => {
  const obj = JSON.parse(loadJSON(network) || '{}')
  delete obj[property]
  saveJSON(network, obj)
}


