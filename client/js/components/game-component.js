import React, { Component } from 'react'

import BoardComponent from './board-component'

class GameComponent extends Component {
    constructor(props) {
        super(props)

        this.state = { score: 0 }
    }

    render() {
        return (
            <div>
                <h4>Score: {this.state.score}</h4>
                <br />
                <BoardComponent />
            </div>
        )
    }
}

export default GameComponent
