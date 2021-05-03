export default function Question({ content, addToAnswers }) {

  // after clicking on button, this gets saved to state
  const handleClick = (choice, e) => {
    e.preventDefault()
    addToAnswers(choice)
  }

  return (
    <div>
      <div>
        {content.prompt}
      </div>
      <div>
        <button onClick={(e) => handleClick('a', e)}>
          choice1
        </button>
        {content.choice1}
      </div>
      <div>
        <button onClick={(e) => handleClick('b', e)}>
          choice2
        </button>
        {content.choice2}
      </div>
      <div>
        <button onClick={(e) => handleClick('c', e)}>
          choice3
        </button>
        {content.choice3}
      </div>
      <div>
        <button onClick={(e) => handleClick('d', e)}>
          choice4
        </button>
        {content.choice4}
      </div>
    </div>
  )
}
