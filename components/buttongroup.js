export default function ButtonGroup({ setCurrentQuestionNumber }) {

  const handleClick = (number, e) => {
    e.preventDefault()
    setCurrentQuestionNumber(number)
  }

  return (
    <>
      <div>
        <button onClick={(e) => handleClick(1, e)}>1</button>
      </div>
      <div>
        <button onClick={(e) => handleClick(2, e)}>2</button>
      </div>
      <div>
        <button onClick={(e) => handleClick(3, e)}>3</button>
      </div>
    </>
  )
}
