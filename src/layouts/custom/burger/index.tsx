import "@/layouts/custom/burger/index.less"

const Burger = (e: {
  collapsed: boolean
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
  darkTheme: boolean
}) => {
  const { collapsed, setCollapsed, darkTheme } = e
  const burgerColor = () => {
    if (darkTheme) {
      return "white"
    } else {
      return "black"
    }
  }
  return (
    <div className="hamburger no-drag">
      <input
        className="checkbox"
        type="checkbox"
        onChange={() => setCollapsed(!collapsed)}
        checked={!collapsed}
      />
      <svg fill="none" viewBox="0 0 50 50" height="30" width="60">
        <path
          className="lineTop line"
          strokeLinecap="round"
          strokeWidth="4"
          stroke="black"
          d="M6 11L44 11"
          style={{ stroke: burgerColor() }}
        ></path>
        0
        <path
          strokeLinecap="round"
          strokeWidth="4"
          stroke="black"
          d="M6 24H43"
          className="lineMid line"
          style={{ stroke: burgerColor() }}
        ></path>
        <path
          strokeLinecap="round"
          strokeWidth="4"
          stroke="black"
          d="M6 37H43"
          className="lineBottom line"
          style={{ stroke: burgerColor() }}
        ></path>
      </svg>
    </div>
  )
}

export default Burger
