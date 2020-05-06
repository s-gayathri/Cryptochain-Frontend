import React from 'react';
import { FormGroup, FormControl, FormLabel, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import history from "../history";

class ConductTransaction extends React.Component {
    state = {
        recipient: "",
        amount: 0,
        knownAddresses: []
    }

    componentDidMount() {
        fetch(`http://localhost:3001/api/known-addresses`)
            .then(res => res.json())
            .then(data => this.setState({ knownAddresses: data }))
            .catch(err => console.log(err));
    }

    updateRecipient = (event) => {
        this.setState({ recipient: event.target.value });
    }

    updateAmount = (event) => {
        this.setState({ amount: Number(event.target.value) });
    }

    conductTransaction = () => {
        console.log("Clicked");
        const { recipient, amount } = this.state;

        fetch(`http://localhost:3001/api/transact`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ recipient, amount })
        }).then(res => res.json())
            .then(data => {
                alert(data.message || data.type);
                history.push("/transaction-pool");
            })
            .catch(err => console.log(err));
    }

    render () {
        return (
            <div className='ConductTransaction'>
                <div><Link to="/">Home</Link></div>
                <br />
                <h3>Conduct a Transaction</h3>
                <br />
                <h4>Known Addresses</h4>
                {   
                    this.state.knownAddresses.map(address => {
                        return (
                            <div key={address}>
                                <div>{address}</div>
                                <br />
                            </div>
                        );
                    })
                }
                <br />
                <FormGroup>
                    <FormLabel className="FormLabel">Recipient Address</FormLabel>
                    <FormControl
                        required
                        input="text"
                        placeholder="recipient"
                        value={this.state.recipient}
                        onChange={this.updateRecipient} />
                </FormGroup>
                <FormGroup>
                    <FormLabel className="FormLabel">Amount</FormLabel>
                    <FormControl
                        required
                        input="number"
                        placeholder="amount"
                        value={this.state.amount}
                        onChange={this.updateAmount} />
                </FormGroup>
                <Button 
                    variant="success"
                    size="small"
                    onClick={this.conductTransaction}>
                        Submit
                    </Button>
            </div>
        );
    }
}

export default ConductTransaction;