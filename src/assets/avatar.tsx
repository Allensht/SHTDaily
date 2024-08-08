const NumAvatar = (e: {num: number}) => {
  const {num} = e

  return (
    <h1 style={{ borderRadius: '50%', backgroundColor: '#ff822d', padding: '10px', textAlign: 'center', width: '50px', height: '50px', color: '#000', fontWeight: 'bold', fontSize: '20px'}}>
        {num + 1}
    </h1>
    )
}

export default NumAvatar