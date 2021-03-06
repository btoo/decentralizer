import truffleConfig from '../../truffle'
import Web3 from 'web3'
import Board from 'contracts/Board.sol'
import Ad from 'contracts/Ad.sol'

import {
  GET_DIMENSIONS
} from './actions'

export const web3 = typeof window.web3 !== 'undefined' // Supports Metamask and Mist, and other wallets that provide 'web3'.
  ? new Web3(window.web3.currentProvider) // Use the Mist/wallet provider. eslint-disable-next-line
  : new Web3(new Web3.providers.HttpProvider(`http://${truffleConfig.networks[process.env.NODE_ENV].host}:${truffleConfig.networks[process.env.NODE_ENV].port}`))

Board.setProvider(web3.currentProvider)
Ad.setProvider(web3.currentProvider)

const accounts = web3.eth.accounts // accounts hosted on this node
    , from = accounts.length > 1
        ? prompt(`Which account would you like to use?\n${
            accounts.map(acc => acc).join('\n')
          }`, accounts[0])
        : accounts[0]

export default (state = {
  web3,
  txObj: {
    from,
    // gas: 4700000
    gas: 4476768
  },
  height: window.innerHeight,
  width: window.innerWidth
}, action) => {

  switch(action.type){

    case GET_DIMENSIONS: return {
      ...state,
      height: action.height,
      width: action.width
    }

    default: return state
  }

}