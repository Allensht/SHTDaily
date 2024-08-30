const NumAvatar = (e: { num: number }) => {
  const { num } = e
  // TODO 优化样式
  return (
    <h1
      style={{
        borderRadius: "20px",
        backgroundColor: "#ff822d",
        textAlign: "center",
        width: "30px",
        height: "30px",
        color: "#000",
        fontWeight: "bold",
        fontSize: "15px",
      }}
    >
      {num + 1}
    </h1>
  )
}

export default NumAvatar
