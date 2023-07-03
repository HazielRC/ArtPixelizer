import "../stylesheets/editor.css"
import "../stylesheets/toolBar.css"

import CanvasBox from "./canvasBox.jsx"

function ToolBar() {
  return (
    <nav className="tools">
      <ul className="tools-list">
        <li className="tool-item">
          <button className="tool"><i class="fa-solid fa-pencil"></i> <span>Pencil</span></button>
        </li>
        <li className="tool-item">
          <button className="tool"><i class="fa-solid fa-fill"></i> <span>Fill</span></button>
        </li>
        <li className="tool-item">
          <button className="tool"><i class="fa-solid fa-eye-dropper"></i> <span>Picker</span></button>
        </li>
        <li className="tool-item">
          <button className="tool"><i class="fa-regular fa-circle"></i> <span>Circle</span></button>
        </li>
        <li className="tool-item">
          <button className="tool"><i class="fa-solid fa-eraser"></i> <span>Eraser</span></button>
        </li>
        <li className="tool-item">
          <button className="tool"><i class="fa-solid fa-eraser"></i> <span>Eraser</span></button>
        </li>
        <li className="tool-item">
          <button className="tool"><i class="fa-solid fa-eraser"></i> <span>Eraser</span></button>
        </li>
      </ul>
    </nav>
  )
}

function Editor() {
  return (
    <div className="container">
      <ToolBar />
      <CanvasBox />
    </div>
  )
}

export default Editor;