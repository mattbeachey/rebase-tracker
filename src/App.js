import './App.css';
import styled from "styled-components";

import MainGraph from './Components/Chart';

function App() {
  return (
    <Body>
      <GraphBox>
        {/* <MainGraph /> */}
      </GraphBox>
    </Body>
  );
}

const Body = styled.div`
  background-color: #43454b;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`

const GraphBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1000px;
  height: 600px;
  background-color: #fff;
`
export default App;
