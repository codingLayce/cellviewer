class Board {
  private board: Array<Array<number>>

  constructor(width: number, height:number, from?: Board) {
    this.board = []
    for (let r = 0; r < width; ++r) {
      const row = []
      for (let c = 0; c < height; ++c) {
        if (from) {
          row.push(from.stateOf(r, c))
        } else {
          row.push(0)
        }
      }
      this.board.push(row)
    }
  }

  public nextState(): Board {
    const b = new Board(this.width(), this.height(), this)
    
    for (let row = 0; row < b.height(); ++row) {
      for (let col = 0; col < b.width(); ++col) {
        const alivedNeighbors = this.aliveNeighbors(row, col)
        if (this.board[row][col] == 0 && alivedNeighbors == 3) b.setState(row, col, 1)
        if (this.board[row][col] == 1 && alivedNeighbors != 2 && alivedNeighbors != 3) b.setState(row, col, 0)
      }
    }

    return b
  }

  private aliveNeighbors(x: number, y: number) {
    let count = 0
    for (let i = -1; i <= 1; ++i) {
      for (let j = -1; j <= 1; ++j) {
        if (i == 0 && j == 0) continue
        if (x+i < 0 || x+i >= this.width()) continue
        if (y+i < 0 || y+i >= this.height()) continue
        if (this.board[x+i][y+j] == 1) {
          count++
        }
      }
    }
    return count
  }

  public hasAlivedCells(): boolean {
    for (let row = 0; row < this.height(); ++row) {
      for (let col = 0; col < this.width(); ++col) {
        if (this.board[row][col] == 1) return true
      }
    }
    return false
  }

  public setState(x: number, y: number, state: number) {
    // TODO(LG): Vérifier les bornes.
    this.board[x][y] = state
  }

  public stateOf(x: number, y: number): number {
    // TODO(LG): Vérifier les bornes.
    return this.board[x][y]
  }

  public width(): number {
    return this.board.length
  }

  public height(): number {
    return this.board[0].length
  }
}