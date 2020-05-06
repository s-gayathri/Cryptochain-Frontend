import React from 'react';
import logo from "./Assets/logo.jpg";
import { Link } from 'react-router-dom';

class App extends React.Component {
  state = {
    walletInfo: {
      address: "",
      balance: ""
     }
  }

  componentDidMount() {
    fetch(`http://localhost:3001/api/wallet-info`)
      .then(res => res.json())
      .then(data => this.setState({ walletInfo: data }))
      .catch(err => console.log(err));
  }

  render() {
    const { address, balance } = this.state.walletInfo;

    return (
      <div className="App">
        <img className="logo" src={logo} alt=""></img>
        <br></br>
        <div>
          Welcome to the Cryptochain!
        </div>
        <br></br>
        <div><Link to="/blocks"> Blocks </Link></div>
        <div><Link to="/conduct-transaction"> Conduct a Transaction </Link></div>
        <div><Link to="/transaction-pool"> Transaction Pool </Link></div>
        <br></br>
        <div className="WalletInfo">
          <div> Address: {address} </div>
          <div> Balance: {balance} </div>
        </div>
      </div>
    );
  }
}

export default App;
