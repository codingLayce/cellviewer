class Controls {
  public nextBtn: HTMLButtonElement
  public resetBtn: HTMLButtonElement
  public playBtn: HTMLButtonElement
  public pauseBtn: HTMLButtonElement
  public perSecondsRange: HTMLInputElement
  public perSecondsDisplay: HTMLElement

  constructor() {
    this.nextBtn = this.loadButton("next_btn")
    this.resetBtn = this.loadButton("reset_btn")
    this.playBtn = this.loadButton("play_btn")
    this.pauseBtn = this.loadButton("pause_btn")

    this.perSecondsRange = this.loadInput("framePerSeconds_input")
    this.perSecondsDisplay = this.loadElement("framePerSecondsDisplay")
  }

  private loadButton(id: string): HTMLButtonElement {
    const btn: HTMLButtonElement = document.getElementById(id) as HTMLButtonElement
    if (btn == null) {
      throw new Error("Cannot retrieve ${id}")
    }
    return btn
  }

  private loadInput(id: string): HTMLInputElement {
    const input: HTMLInputElement = document.getElementById(id) as HTMLInputElement
    if (input == null) {
      throw new Error("Cannot retrieve ${id}")
    }
    return input
  }

  private loadElement(id: string): HTMLElement {
    const el: HTMLElement = document.getElementById(id) as HTMLElement
    if (el == null) {
      throw new Error("Cannot retrieve ${id}")
    }
    return el
  }
}