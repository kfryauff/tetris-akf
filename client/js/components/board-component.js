import React, { Component } from 'react'

import PieceComponent from './piece-component'


const NUM_PIECES = 7
class BoardComponent extends Component {
    constructor(props) {
        super(props)

        let board, activePiece, boardConstraints

        this.new_row = new Array(10).join('0').split('').map(parseFloat)
        board = this.getNewBoard()
        activePiece = this.getRandomePiece()
        boardConstraints = {
          left: 0,
          right: board[0].length,
          top: 2,
          bottom: Array.apply(null, Array(22)).map(() => 22),
        }

        this.state = { board, activePiece, boardConstraints }
    }

    /***********
     * Actions *
     ***********/

    placePiece(piece) {
        let { board, activePiece } = this.state

        activePiece = this.getRandomePiece()

        this.setState({ board, activePiece })
    }

    /***********
     * Getters *
     ***********/

    getNewBoard() {
      return Array.apply(null, Array(22)).map(() => this.new_row)
    }

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
            startCenterPoint={[4, 1]}
            boardConstraints={this.state.boardConstraints}
            placePiece={this.placePiece}
          />
        </div>
      )
    }
}

export default BoardComponent
