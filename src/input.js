// Input handling
export class InputManager {
  constructor() {
    this.keys = {}
    this.setupEventListeners()
  }

  setupEventListeners() {
    document.addEventListener('keydown', (e) => {
      this.keys[e.key] = true
    })

    document.addEventListener('keyup', (e) => {
      this.keys[e.key] = false
    })
  }

  isKeyPressed(key) {
    return this.keys[key] || false
  }

  getKeys() {
    return this.keys
  }
}
