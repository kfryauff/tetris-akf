import React, { Component } from 'react'
import math from 'mathjs'

const BLOCK_SIZE = 15
class PieceComponent extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            centerPoint: props.startCenterPoint,
            points: this.getPiece(),
        }
        
        console.log(props.type)
    }
    
    rotatePiece() {
        
    }
    
    dropPiece() {
        
    }
    
    /***********
     * Getters *
     ***********/
     
    getPiece() {
        let { type } = this.props
        let points = [] // points [ [x1, y1], [x2, y2], [x3, y3] ]
        
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
    
    formatPiece() {
        let { type } = this.props
        let { centerPoint, points } = this.state
        let gridPoints
        
        gridPoints = points.map(p => 
            math.add(centerPoint, math.matrix([p]))._data)
        
        console.log(gridPoints)
        
        return gridPoints.map(p => {
            let pieceBlockClassName = "piece-block board-block-" + type
            return (
                <div 
                    className={pieceBlockClassName} 
                    top={p[1] * BLOCK_SIZE} 
                    right={p[0] * BLOCK_SIZE}
                />
            )
        })
    }
    
    render() {
        return (
            <div className="piece">{this.formatPiece()}</div>
        )
    }
}

export default PieceComponent