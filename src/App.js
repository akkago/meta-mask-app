import './App.css';
import React, { useState } from 'react';
import Web3 from 'web3';

function App() {
  let [publicAdress, setPublicAddress] = useState('');
  let w3;

  async function connect() {
    try {
      const accounts = await w3.eth.getAccounts();

      if (!accounts[0]) {
        alert('Кошелёк не найден, войдите в Метамаск создайте кошелёк и подключите этот сайт');
      }
      else {
        setPublicAddress(accounts[0]);
      }
    } catch (err) { console.error(err); }
  }

  const onClick = () => {
    w3 = checkAndInstantiateWeb3()
    connect();
  }

  function checkAndInstantiateWeb3() {
    try {
      if (window.web3 !== 'undefined') {
        console.log("Using Metamask's web3 provider");
        return new Web3(window.web3.currentProvider);
      } else {
        console.warn('No web3 detected. Falling back to http://localhost:8545.');
        return new Web3(new this.Web3.providers.HttpProvider('http://localhost:8545'));
      }
    } catch (err) { console.error(err); }
  }

  return (
    <div className="App">
      <button onClick={onClick}>
        Get public key
      </button>
      <div>public key: {publicAdress}</div>
    </div>
  );
}

export default App;
