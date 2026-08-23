import {useState} from 'react'

const App = () => {
  const [counter, setCounter] = useState(0)
  console.log('rendering with counter value', counter);

  setTimeout(
    () => setCounter(counter + 1), 1000
  )
  console.log('rendering...', counter);

  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    }, 
  ];
  const handleClicks = () => {
    console.log('clicked')
  }
  const increaseByOne = () => {
    console.log('increasing value before', counter);
    setCounter(counter + 1)
  }
  const setToZero = () => {
    console.log('resetting to zero, value before', counter);
    setCounter(0)
  }
  const decreaseByOne = () => {
    console.log('decreasing value before', counter);
    setCounter(counter - 1)
  }
 
   //working with buttons:
  const [value, setValue] = useState(10)
  const setToValue = (newValue) => {
    console.log('value now', newValue);
    setValue(newValue)
  }


  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
      <Display counter={counter} /> 
      <Button onClick={increaseByOne} text="plus" />
      <Button onClick={setToZero} text="zero" />
      <Button onClick={decreaseByOne} text="minus" />

      <p>working with buttons:</p>
      <DisplayValue value={value} />
      <div>
      <Button onClick={handleClick} text="button" />
      <Button onClick={() => setToValue(1000)} text="thousand" />
      <Button onClick={() => setToValue(0)} text="reset" />
      <Button onClick={() => setToValue(value + 1)} text="increment" /></div>

    </div>
  );
};

 //display component:
  const Display = ({counter}) => <div>{counter}</div>
  const DisplayValue = ({value}) => <div>{value}</div>
  //Button component:
  const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

  const handleClick = () => console.log('clicked the button')



const Header = (props) => {
  console.log(props);
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};

const Content = (props) => {
  console.log(props);
  return (
    <div>
      {props.parts.map((part) => (
        <p key={part.name}>
          {part.name} {part.exercises}
        </p>
      ))}
    </div>
  );
};

const Total = (props) => {
  console.log(props);
  return (
    <div>
      <p>
        Number of exercises done:
        {props.parts.reduce((sum, part) => sum + part.exercises, 0)}
      </p>
    </div>
  );
};

const Arto = (props) => {
  const name = 'arto hellas';
  const age = 35;
  const education = 'PhD'


  console.log(props);
  return(
      <>

      </>
  )

}
export default App;
