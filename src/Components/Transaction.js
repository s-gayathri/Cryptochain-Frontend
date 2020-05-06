import React from 'react';

const Transaction = ({ transaction }) => {
    const { input, outputMap } = transaction;
    const recipients = Object.keys(outputMap);

    return (
        <div className="Transaction">
            <div> 
                <div> From: {`${input.address.substring(0, 20)}...`} </div>
                <div> Balance: {input.amount} </div>
                <br />
            </div>
            {
                recipients.map(recipient => (
                    <div key={recipient}>
                        <div> To:{`${recipient.substring(0, 20)}...`} </div>
                        <div> Received: {outputMap[recipient]} </div>
                        <br />
                    </div>
                ))
            }
        </div>
    );
}

export default Transaction;