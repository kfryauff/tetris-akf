import React, { Component } from 'react'
import constants from '../util/constants'

const BLOCK_SIZE = 15
class PieceComponent extends Component {

  constructor(props) {
      super(props)

      this.state = {
        centerPoint: props.startCenterPoint,
        points: this.getPiece(),
        paused: false,
        pauseInterval: props.pauseInterval || 1000,
      }
  }

  /***********
   * Getters *
   ***********/

  getPiece() {
      let { type } = this.props
      let points = [] // points [ [x1, y1], [x2, y2], [x3, y3], [x4, y4] ]

      switch(type) {
          case 1: // I block
              points = [[-1, 0], [0, 0], [1, 0], [2, 0]]
              break
          case 2: // J block
              points = [[-1, 1], [-1, 0], [0, 0], [1, 0]]
              break
          case 3: // L block
              points = [[-1, 0], [0, 0], [1, 0], [1, 1]]
              break
          case 4: // O block
              points = [[0, 0], [1, 0], [1, 1], [0, 1]]
              break
          case 5: // S block
              points = [[-1, 0], [0, 0], [0, 1], [1, 1]]
              break
          case 6: // T block
              points = [[-1, 0], [0, 0], [0, 1], [1, 0]]
              break
          case 7: // Z block
              points = [[-1, 1], [0, 1], [0, 0], [1, 0]]
              break
          default:
              points = null
      }

      return points
  }

  getGridPoints(points, centerPoint) {
    return points.map(p => [p[0] + centerPoint[0], centerPoint[1] - p[1]])
  }

  /***********
   * Actions *
   ***********/

  /** Piece Actions **/

  maybePlacePiece(points, centerPoint) {
    let { tryMovePiece } = this.props
    let { pieceStates } = constants
    let gridPoints = this.getGridPoints(points, centerPoint)

    if (tryMovePiece(gridPoints) !== pieceStates.INVALID_POSITION)
      this.setState({ points, centerPoint })
  }

  movePiece(deltaX = 0, deltaY = 0) {
    let { points, centerPoint } = this.state

    centerPoint = [centerPoint[0] + deltaX, centerPoint[1] + deltaY]
    this.maybePlacePiece(points, centerPoint)

  }

  // rotates piece to the right 90 degrees
  rotatePiece() {
    let { points, centerPoint } = this.state

    points = points.map(p => [-p[1], p[0]])

    this.maybePlacePiece(points, centerPoint)
  }

  /** Timer Actions **/

  clearTimer() {
    clearInterval(this.timerID)
  }

  setTimer() {
    this.timerID = setInterval(
      () => this.handleTick(),
      this.state.pauseInterval,
    );
  }

  resetTimerID() {
    this.clearTimer()
    this.setTimer()
  }

  /************
   * Handlers *
   ************/

  handleTick() {
    if (!this.state.paused) {
      this.movePiece(0, 1)
    }
  }

  handleKeyDown(e) {
    if (e.which === 80) {  // P (pause)
      e.preventDefault()
      // this.state.pause ? this.setTimer() : this.clearTimer()
      this.setState({ paused: !this.state.paused })
    } else if (!this.state.paused) {
      if (e.which === 38 || e.which === 16) {   // up, shift
        e.preventDefault()
        this.rotatePiece()
      } else if (e.which === 40) {   // down
        e.preventDefault()
        this.movePiece(0, 1)
      } else if (e.which === 39) {   // right
        e.preventDefault()
        this.movePiece(1, 0)
      } else if (e.which === 37) {   // left
        e.preventDefault()
        this.movePiece(-1, 0)
      } else if (e.which === 32 || e.which === 13 || e.which === 20) {  // sapce, enter
        e.preventDefault()
        this.dropPiece()
      }
    }
  }

  /**************
   * Formatters *
   **************/

  formatPiece() {
      let { type } = this.props
      let { points, centerPoint } = this.state
      let gridPoints = this.getGridPoints(points, centerPoint)

      return gridPoints.map((gp, i) => {
          let pieceBlockClassName = "piece-block board-block-" + type
          return (
              <div
                key={i}
                className={pieceBlockClassName}
                style={{top: gp[1] * BLOCK_SIZE, left: gp[0] * BLOCK_SIZE}}
              />
          )
      })
  }

  /***********************
   * Component Lifecycle *
   ***********************/

  componentDidMount() {
    this.setTimer()

    $(document).keydown(this.handleKeyDown.bind(this))
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  render() {
      return (
          <div className="piece">{this.formatPiece()}</div>
      )
  }
}

export default PieceComponent
