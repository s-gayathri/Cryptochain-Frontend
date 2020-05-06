import React from 'react';
import Block from "./Block";
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Blocks extends React.Component {
    state = {
        blocks: [],
        paginatedID: 1,
        chainLength: 0
    }

    componentDidMount() {
        fetch(`http://localhost:3001/api/blocks/length`)
            .then(res => res.json())
            .then(data => this.setState({ chainLength: data }))
            .catch(err => console.log(err));

        this.fetchPaginatedBlocks(this.state.paginatedID)();
    }

    fetchPaginatedBlocks = (paginatedID) => () => {
        fetch(`http://localhost:3001/api/blocks/${paginatedID}`)
            .then(res => res.json())
            .then(data => this.setState({ blocks: data }))
            .catch(err => console.log(err));
    }

    render() {
        console.log("Blocks:",this.state);

        return(
            <div>
                <div><Link to="/"> Home </Link></div>
                <h3> BLOCKS </h3>
                <div>
                    {
                        [...Array(Math.ceil(this.state.chainLength/5)).keys()].map(key => {
                            const paginatedID = key + 1;

                            return (
                                <span key={key}>
                                    <Button variant="success"
                                            size="small"
                                            onClick={this.fetchPaginatedBlocks(paginatedID)}>
                                                {paginatedID}
                                    </Button>
                                    {"   "}
                                </span>
                            )
                        })
                    }
                </div>
                {
                    this.state.blocks.map(block => {
                        return(
                            <Block key={ block.hash } block={block} />
                        )
                    })
                }
            </div>
        );
    }
}

export default Blocks;