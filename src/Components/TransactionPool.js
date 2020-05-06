import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Transaction from "./Transaction";
import history from "../history";

const POLL_INTERVAL_MS = 10000; //milliseconds

class TransactionPool extends React.Component {
    state = {
        transactionPoolMap: {}
    }

    fetchTransactionPoolMap = () => {
        fetch(`http://localhost:3001/api/transaction-pool-map`)
            .then(res => res.json())
            .then(data => this.setState({ transactionPoolMap: data }))
            .catch(err => console.log(err));
    }

    fetchMineTransactions = () => {
        fetch(`http://localhost:3001/api/mine-transactions`)
            .then(res => {
                if(res.status === 200) {
                    alert("Success!");
                    history.push("/blocks");
                } else {
                    alert("The mine-transactions block request did not complete.");
                }
            })
            .catch(err => console.log(err));
    }
    
    componentDidMount() {
        this.fetchTransactionPoolMap();

        this.fetchPoolMapInterval = setInterval(() => {
            return this.fetchTransactionPoolMap()
        }, POLL_INTERVAL_MS);
    }

    componentWillUnmount() {
        clearInterval(this.fetchPoolMapInterval);
    }

    render() {
        return (
            <div className="TransactionPool">
                <div><Link to="/">Home</Link></div>
                <br />
                <h3>Transaction Pool</h3>
                {
                    Object.values(this.state.transactionPoolMap).map(trans => {
                        return (
                            <div key={trans.id}>
                                <hr />
                                <Transaction transaction={trans} />
                            </div>
                        )
                    })
                }
                <hr />
                <Button
                    variant="success"
                    size="small"
                    onClick={this.fetchMineTransactions}>
                        Mine the Transactions
                </Button>
            </div>
        );
    }
}

export default TransactionPool;