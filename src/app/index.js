import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import {

// } from './actions'

import Header from './header'
import BoardContainer, { BoardCreator } from 'board'
import './index.css'

const mapStateToProps = store => { return {
  web3: store.app.web3,
  txObj: store.app.txObj,
  boardContract: store.board.boardContract,
}}

const mapDispatchToProps = dispatch => { return bindActionCreators({
  
}, dispatch)}

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
  
  render() { return (
    <main className="app">
      <Header boardContract={this.props.boardContract} />
      {this.props.boardContract ? <BoardContainer /> : ''}
    </main>
  )}
}