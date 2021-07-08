import { useState, useEffect } from 'react' 
export default function Question({ content, addToAnswers, index }) {
  const [selected, setSelected] = useState([false, false, false, false])
  const url =`https://plmat-bucket.s3.ap-southeast-1.amazonaws.com/${content.fileUrl}`

  const initializeSelected = () => {
    setSelected([false, false, false, false])
  }

  // after clicking on button, this gets saved to state
  const handleClick = (choice, idx, e) => {
    e.preventDefault()
    const tempSelected = [false, false, false, false]
    tempSelected[idx] = !selected[idx]
    setSelected(tempSelected)
    addToAnswers(choice, index)
  }

  useEffect(() => {
    initializeSelected()
  }, [content])

  // need to randomize choices
  return (
    <div class="container mx-auto my-12 px-4">
      <div class="p-6 mx-auto bg-white border border-gray-300 rounded-lg shadow-lg w-2/5">
        <h3 class="text-yellow-500 text-xl font-custom font-semibold">Question {index + 1}</h3>
        <div class="my-4">
          <p class="text-black text-lg font-custom font-normal tracking-tight">{content.text}</p>
          { content.fileUrl && <img src={url}/> }
        </div>
        <div class={"p-4 mx-auto bg-gray border border-gray-300 transition duration-500 ease-in-out hover:bg-gray-100 active:bg-gray-300 " + (selected[0] ? "bg-gray-200" : "")} onClick={(e) => handleClick(content.choices[0], 0, e)}>
          <p class="font-custom text-black text-lg">{content.choices[0]}</p>
        </div>
        <div class={"p-4 mx-auto bg-gray border border-gray-300 transition duration-500 ease-in-out hover:bg-gray-100 active:bg-gray-300 " + (selected[1] ? "bg-gray-200" : "")} onClick={(e) => handleClick(content.choices[1], 1, e)}>
          <p class="font-custom text-black text-lg">{content.choices[1]}</p>
        </div>
        <div class={"p-4 mx-auto bg-gray border border-gray-300 transition duration-500 ease-in-out hover:bg-gray-100 active:bg-gray-300 " + (selected[2] ? "bg-gray-200" : "")} onClick={(e) => handleClick(content.choices[2], 2, e)}>
          <p class="font-custom text-black text-lg">{content.choices[2]}</p>
        </div>
        <div class={"p-4 mx-auto bg-gray border border-gray-300 transition duration-500 ease-in-out hover:bg-gray-100 active:bg-gray-300 " + (selected[3] ? "bg-gray-200" : "")} onClick={(e) => handleClick(content.choices[3], 3, e)}>
          <p class="font-custom text-black text-lg">{content.choices[3]}</p>
        </div>
      </div>
    </div>
  )
}
