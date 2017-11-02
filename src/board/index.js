import React, { Component } from 'react'
import AdContainer from 'ad'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  fetchAdsIfNeeded as fetchAds,
  postAd
} from './actions'
import Board from 'contracts/Board.sol'
import './index.css'
import Bubbles from "bubbles"

const mapStateToProps = store => { // set the props for this component
  return {
    web3: store.app.web3,
    boardContract: store.board.boardContract,
    txObj: store.app.txObj,
    ads: store.board.ads,
    height: store.app.height,
    width: store.app.width
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchAds,
  postAd
}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class BoardContainer extends Component {
  
  async componentWillMount(){
    const fetchResult = await this.props.fetchAds(this.props.boardContract)
    // console.log(fetchResult)
  }
  
  render() { return (
    <div className="board" ref={node => this.node = node}>
      <button className="board--post-ad" onClick={_ => {
        const postedAdIndex = this.props.ads.length
        this.props.postAd(this.props.web3, this.props.txObj, this.props.boardContract, postedAdIndex, {
          title: `title #${postedAdIndex}`,
          img: `img #${postedAdIndex}`,
          href: `href #${postedAdIndex}`,
          contribution: 88 * postedAdIndex
        })
      }}>
        click this to post a new ad
      </button>
      <Bubbles
        ads={this.props.ads}
        height={this.props.height}
        width={this.props.width}
      />
      {/* {this.props.ads.map((ad, i) => <AdContainer key={i} {...ad} />)} */}
    </div>
  )}
}

export { default as CreateBoardContainer } from './create'