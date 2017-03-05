import React, { Component } from 'react'

import PieceComponent from './piece-component'


const NUM_PIECES = 7
class BoardComponent extends Component {
    constructor(props) {
        super(props)
        
        let board, activePiece
        
        this.new_row = new Array(10).join('0').split('').map(parseFloat)
        board = Array.apply(null, Array(22)).map(() => this.new_row)
        activePiece = this.getRandomePiece()
        
        this.state = { board, activePiece }
    }
    
    /***********
     * Actions *
     ***********/
    
    placePiece() {
        let { board, activePiece } = this.state
        
        
        activePiece = this.getRandomePiece()
        
        this.setState({ board, activePiece })
    }
    
    /***********
     * Getters *
     ***********/
    
    getRandomePiece() {
        return Math.ceil(Math.random() * (NUM_PIECES - 1)) + 1
    }
    
    /**************
     * Formatters *
     **************/
    
    formatBoard() {
        let { board } = this.state
        
        return board.map((row, rowIndex) => {
            let rowClass = "board-row row-" + rowIndex
            let rowBlocks = row.map((value, blockIndex) => {
                const blockClassName = "board-block-" + value
                return (
                    <div className={blockClassName} key={blockIndex} />
                )
            })
                
            return (
                <div className={rowClass} key={rowIndex}>
                    {rowBlocks}
                </div>
            )
        })
    }
    
    /***********************
     * Component Lifecycle *
     ***********************/
    
    render() {
        return (
            <div className="board">
                {this.formatBoard()}
                <PieceComponent 
                    type={this.state.activePiece} 
                    startCenterPoint={[5, 1]} 
                />
            </div>
        )
    }
}

export default BoardComponent