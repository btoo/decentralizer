import Board from 'contracts/Board.sol'
import {
  REQUEST_ADS,
  RECEIVE_ADS,
  INVALIDATE_ADS
} from './actions'

const boardAddress = '0x6f359f9f496e5a96aa8fdf0c10fa32f2a95259b1'

export default (state = {
  boardAddress,
  boardContract: Board.at(boardAddress),
  fetchingAdsCount: false,
  fetchAdsCountError: null,
  adsCount: null,
  fetchingAds: false,
  fetchAdsError: null,
  ads: [],
}, action) => {

  switch (action.type){

    case REQUEST_ADS: return {
      ...state,
      fetchingAds: true
    }

    case RECEIVE_ADS: return {
      ...state,
      fetchingAds: false,
      ads: action.ads
    }

    case INVALIDATE_ADS: return {
      ...state,
      fetchingAds: false,
      fetchAdsError: action.error
    }

    default: return state
    
  }
  
}