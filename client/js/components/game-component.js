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
                Score: {this.state.score}
                <BoardComponent />
            </div>
        )
    }
}

export default GameComponent