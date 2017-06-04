import React, { Component } from 'react'

import constants from '../util/constants'
import PieceComponent from './piece-component'

const NUM_PIECES = 7
const TOP_BAR_POSITION = 2
const BOARD_ROW_COUNT = 22
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
          top: TOP_BAR_POSITION,
          bottom: Array.apply(null, Array(BOARD_ROW_COUNT)).map(() => BOARD_ROW_COUNT),
        }

        this.state = { board, activePiece, boardConstraints }
    }

    /***********
     * Actions *
     ***********/

    tryMovePiece(gridPoints) {
      let { pieceStates } = constants
      let validMove = pieceStates.VALID_POSITION

      gridPoints.forEach(gridPoint => {
        if (this.isOverflowLeft(gridPoint) ||
            this.isOverflowRight(gridPoint) ||
            this.isOverflowBottom(gridPoint)) {
          validMove = pieceStates.INVALID_POSITION
        }
      })

      return validMove
    }

    placePiece(piece) {
        let { board, activePiece } = this.state

        activePiece = this.getRandomePiece()

        this.setState({ board, activePiece })
    }

    /***********
     * Getters *
     ***********/

    getNewBoard() {
      return Array.apply(null, Array(BOARD_ROW_COUNT)).map(() => this.new_row)
    }

    getRandomePiece() {
      return Math.ceil(Math.random() * (NUM_PIECES - 1)) + 1
    }

    isOverflowLeft(point) { return (point[0] < this.state.boardConstraints.left) }

    isOverflowRight(point) {
      return (point[0] >= this.state.boardConstraints.right)
    }

    isOverflowBottom(point) {
      if (point[1] >= this.state.boardConstraints.bottom[point[0]])
        return true

      this.placePiece()
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
            tryMovePiece={this.tryMovePiece.bind(this)}
          />
        </div>
      )
    }
}

export default BoardComponent
