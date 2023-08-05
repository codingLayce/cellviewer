interface MouseListener {
  (renderer: Renderer, event: MouseEvent): void
}

class Renderer {
  private app: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private cellSize: number
  private hoverPos: [number, number] = [-1,-1]
  private current: Board

  constructor(width: number, height: number, board: Board, showHover:boolean = true) {
    this.current = board
    this.cellSize = width / board.width()
    const app: HTMLCanvasElement = document.getElementById("app") as HTMLCanvasElement
    if (app == null) {
      throw new Error("Cannot retrieve canvas")
    }
    this.app = app

    app.width = width
    app.height = height

    const ctx = app.getContext('2d')
    if (ctx == null) {
      throw new Error("Cannot get canvas's 2D context")
    }
    this.ctx = ctx

    if (showHover) {
      this.manageHover()
    }
  }

  public renderBoard(board: Board) {
    this.current = board
    const boardW = board.width()
    const boardH = board.height()
    for (let row = 0; row < boardH; ++row) {
      for (let col = 0; col < boardW; ++col) {
        switch (board.stateOf(row, col)) {
          case 1:
            this.ctx.fillStyle = "#FFDBC3"
            break
          case 0:
            this.ctx.fillStyle = "#3D246C"
            break
        }

        if (this.hoverPos[0] == row && this.hoverPos[1] == col) { // Hover override
            this.ctx.fillStyle = "rgba(255,219,195,150)"
        }
        this.ctx.fillRect(row * this.cellSize, col * this.cellSize, this.cellSize, this.cellSize)
      }
    }
  }

  private manageHover() {
    this.app.addEventListener("mousemove", (e) => {
      this.hoverPos = this.realPosToBoardPos(e.offsetX, e.offsetY)
      this.renderBoard(this.current)
    })
    this.app.addEventListener("mouseout", () => {
      this.hoverPos = [-1, -1]
      this.renderBoard(this.current)
    })
  }

  public realPosToBoardPos(x: number, y: number): [number, number]{
    const boardX = Math.floor(x / this.cellSize)
    const boardY = Math.floor(y / this.cellSize)
    return [boardX, boardY]
  }

  public addClickListener(listener: MouseListener) {
    this.app.addEventListener("click", (e) => {
      listener(this, e)
    })
  }
}