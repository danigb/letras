import { Component } from "react";

const isLetter = (l) => /^[A-ZÑ]$/.test(l)

export default class KeyHandler extends Component {
  constructor (props) {
    super(props)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.prevKey = null
  }
  render () {
    return null
  }
  componentDidMount () {
    window.document.addEventListener("keydown", this.handleKeyDown)
    window.document.addEventListener("keyup", this.handleKeyUp)
  }
  componentWillUnmount () {
    window.document.removeEventListener("keydown", this.handleKeyDown)
    window.document.removeEventListener("keyup", this.handleKeyUp)
  }
  handleKeyDown(e) {
    e.preventDefault()
    const k = e.key.toUpperCase()
    if (k !== this.prevKey && isLetter(k)) {
      this.prevKey = k
      this.props.onAddLetter(k)
    } else if (k === "BACKSPACE") {
      this.props.onDeleteLetter()
    }
  }
  handleKeyUp(e) {
    e.preventDefault()
    this.prevKey = null
  }
}