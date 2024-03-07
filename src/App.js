import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';


// class App extends React.Component {
//   render() {
//     return <header>
//       <div>
//       <h2>Hi, I am a Car!<code>code</code></h2>
//       <h2>h2</h2>
//       </div>
//     </header>;
//   }
// }

// function App() {

//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     setTimeout(() => {
//       setCount(1)
//     },2000)
//   }, [])

//   return (
//     <div className="App">
//       <header className="App-header">
//         <div>{count}</div>
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

function App() {

  const [count, setCount] = useState(0);

  return (
    <div key="nihao" onClick={() => setCount(count+1)}>
      {count}
    </div>
  );
}

export default App;
