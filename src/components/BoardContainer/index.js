import React, { Component } from 'react'
// import SendCoin from 'components/SendCoin/SendCoin'

import Board from 'contracts/Board.sol'
// import Web3 from 'web3'

class BoardContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // accounts: [],
      // coinbase: ''
    }
    // this._getAccountBalance = this._getAccountBalance.bind(this)
    // this._getAccountBalances = this._getAccountBalances.bind(this)
  }

  // componentWillMount(){
  //   MetaCoin.setProvider(this.props.web3.currentProvider);    
  // }

  // _getAccountBalance (account) {
  //   var meta = MetaCoin.deployed()
  //   return new Promise((resolve, reject) => {
  //     meta.getBalance.call(account, {from: account}).then(function (value) {
  //       resolve({ account: value.valueOf() })
  //     }).catch(function (e) {
  //       console.log(e)
  //       reject()
  //     })
  //   })
  // }

  // _getAccountBalances () {
  //   this.props.web3.eth.getAccounts(function (err, accs) {
  //     if (err != null) {
  //       window.alert('There was an error fetching your accounts.')
  //       console.error(err)
  //       return
  //     }

  //     if (accs.length === 0) {
  //       window.alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.")
  //       return
  //     }

  //     this.setState({coinbase: accs[0]})

  //     var accountsAndBalances = accs.map((account) => {
  //       return this._getAccountBalance(account).then((balance) => { return { account, balance } })
  //     })

  //     Promise.all(accountsAndBalances).then((accountsAndBalances) => {
  //       this.setState({accounts: accountsAndBalances, coinbaseAccount: accountsAndBalances[0]})
  //     })
  //   }.bind(this))
  // }

  async componentDidMount() {

    console.log(this.props.web3)

    console.log('to be removed in production because the ethboard contract will already have been instantiated');
    const {
            toAscii
          } = this.props.web3
        , gas = 4476768
        , accounts = await new Promise((resolve, reject) => this.props.web3.eth.getAccounts((err, accounts) => resolve(accounts)))
        , from = accounts[0]

    Board.defaults({from, gas})
    Board.setProvider(this.props.web3.currentProvider)

    const board = await Board.at("0xde981ffeb8ddc50e6c1cf7689a2c3c82258c2b3c")
    // const board = await Board.new('test init text', 'test init url')
        , adsLength = (await board.getAdsLength()).toNumber()
    
    console.log(board)
    console.log(adsLength)

    // post new ad
    await board.postAd(`test text #${adsLength + 1}`, `test url #${adsLength + 1}`, {from})
    
    const ads = await Promise.all([...Array(adsLength).keys()].map(async adIndex => {
      const ad = await board.getAd.call(adIndex)
      return {
        address: ad[0],
        text: toAscii(ad[1]),
        url: toAscii(ad[2])
      }
    }))
    
    this.setState({ads})
    console.log(this.state.ads)

  }

  render() {
    return (
      <div>
        {/* <AccountList accounts={this.state.accounts} /> */}
        {/* <SendCoin sender={this.state.coinbase} /> */}
      </div>
    )
  }
}

export default BoardContainer
