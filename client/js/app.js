/*global import export */

import React from 'react'
import ReactDOM from 'react-dom'

import GameComponent from './components/game-component'

const App = () => {
    return (
        <div className="container">
            <h1>Welcome To Tetris</h1>
            <GameComponent />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))