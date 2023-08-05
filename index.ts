const CANVAS_SIZE = 700
const NB_CELLS = 50
const CELL_SIZE = CANVAS_SIZE / NB_CELLS

let board: Board = new Board(NB_CELLS, NB_CELLS)

const renderer: Renderer = new Renderer(CANVAS_SIZE, CANVAS_SIZE, board, true)
renderer.addClickListener(onBoardClicked)

const controls: Controls = new Controls()
controls.nextBtn.addEventListener("click", onNextBtnClicked)
controls.resetBtn.addEventListener("click", onResetBtnClicked)
controls.playBtn.addEventListener("click", onPlayBtnClicked)
controls.pauseBtn.addEventListener("click", onPauseBtnClicked)
controls.perSecondsRange.addEventListener("input", onFramePerSecondsChanged)


renderer.renderBoard(board)

let playLoopID: number = -1

function startPlay(interval: number) {
  playLoopID = setInterval(() => {
    if (!board.hasAlivedCells()) onResetBtnClicked()
    onNextBtnClicked()
  }, interval)
}

function stopPlay() {
  clearInterval(playLoopID)
  playLoopID = -1
}

function onFramePerSecondsChanged() {
  controls.perSecondsDisplay.innerHTML = controls.perSecondsRange.value

  if (playLoopID !== -1) { // IsPlaying
    stopPlay()
    startPlay(1000 / parseInt(controls.perSecondsRange.value))
  }
}

function onPlayBtnClicked() {
  controls.playBtn.disabled = true
  controls.pauseBtn.disabled = false
  controls.nextBtn.disabled = true
  startPlay(1000 / parseInt(controls.perSecondsRange.value))
}

function onPauseBtnClicked() {
  controls.playBtn.disabled = false
  controls.pauseBtn.disabled = true
  controls.nextBtn.disabled = false
  stopPlay()
}

function onResetBtnClicked() {
  onPauseBtnClicked() // Reset buttons state
  board = new Board(NB_CELLS, NB_CELLS)
  renderer.renderBoard(board)
}

function onNextBtnClicked() {
  board = board.nextState()
  renderer.renderBoard(board)
}

function onBoardClicked(renderer: Renderer, evt: MouseEvent) {
  const pos = renderer.realPosToBoardPos(evt.offsetX, evt.offsetY)
  board.setState(pos[0], pos[1], 1)
  renderer.renderBoard(board)
}