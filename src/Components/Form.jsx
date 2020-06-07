import React, { Component } from "react";
import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider || "http://localhost:8080");

class Form extends Component {
  state = {
    amount: "",
    balance: "",
  };
  async componentDidMount() {
    this.callBlockchain();
  }
  callBlockchain = async () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8080");
    const network = await web3.eth.net.getNetworkType();
    //fetch smartcontract
  };
  getBalance = async (e) => {
    e.preventDefault();
    const address = "0x459d91Cdf904b1a53bfDb13B05500E449f33743f";
    const abi = [
      {
        constant: false,
        inputs: [
          {
            name: "amount",
            type: "int256",
          },
        ],
        name: "deposit",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          {
            name: "amount",
            type: "int256",
          },
        ],
        name: "withdraw",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        constant: true,
        inputs: [],
        name: "getBalance",
        outputs: [
          {
            name: "",
            type: "int256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
    ];
    const contract = new web3.eth.Contract(abi, address);
    let balance = await contract.methods.getBalance().call();
    this.setState({
      balance: balance,
    });
  };
  deposit = async (e) => {
    e.preventDefault();
    const address = "0x459d91Cdf904b1a53bfDb13B05500E449f33743f";
    const abi = [
      {
        constant: false,
        inputs: [
          {
            name: "amount",
            type: "int256",
          },
        ],
        name: "deposit",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          {
            name: "amount",
            type: "int256",
          },
        ],
        name: "withdraw",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        constant: true,
        inputs: [],
        name: "getBalance",
        outputs: [
          {
            name: "",
            type: "int256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
    ];
    let amount = Number(this.state.amount);
    const contract = new web3.eth.Contract(abi, address);
    await window.ethereum.enable();
    web3.eth.getAccounts().then((accounts) => {
      console.log(accounts);
      let account = accounts[0];
      return contract.methods
        .deposit(amount)
        .send({
          from: account,
        })
        .then((tx) => {
          console.log(tx);
        })
        .catch((err) => {
          console.log(`Error: ${err}`);
        });
    });
  };
  withdraw = async (e) => {
    e.preventDefault();
    const address = "0x459d91Cdf904b1a53bfDb13B05500E449f33743f";
    const abi = [
      {
        constant: false,
        inputs: [
          {
            name: "amount",
            type: "int256",
          },
        ],
        name: "deposit",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          {
            name: "amount",
            type: "int256",
          },
        ],
        name: "withdraw",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        constant: true,
        inputs: [],
        name: "getBalance",
        outputs: [
          {
            name: "",
            type: "int256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
    ];
    let amount = Number(this.state.amount);
    const contract = new web3.eth.Contract(abi, address);
    await window.ethereum.enable();
    web3.eth.getAccounts().then((accounts) => {
      let account = accounts[0];
      return contract.methods
        .withdraw(amount)
        .send({
          from: account,
        })
        .then((tx) => {
          console.log(tx);
        })
        .catch((err) => {
          console.log(`Error: ${err}`);
        });
    });
  };
  handlechange = (e) => {
    this.setState(
      {
        [e.target.name]: Number(e.target.value),
      },
      () => console.log(this.state)
    );
  };

  render() {
    return (
      <div>
        <form>
          <div className="form-group">
            <label>Amount</label>
            <input
              name="amount"
              className="form-control"
              onChange={this.handlechange}
              value={this.state.amount}
              type="number"
            />
          </div>

          <button
            onClick={this.withdraw}
            className="btn btn-outline-primary mr-2"
          >
            Withdraw
          </button>
          <button onClick={this.deposit} className="btn btn-outline-info mr-2">
            Deposit
          </button>
          <button
            onClick={this.getBalance}
            className="btn btn-outline-warning mr-2"
          >
            Get Balance
          </button>
        </form>
        <br />
        {this.state.balance && (
          <h3>Available Balance: ${this.state.balance}</h3>
        )}
      </div>
    );
  }
}

export default Form;
