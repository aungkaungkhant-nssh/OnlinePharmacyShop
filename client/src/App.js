import { BrowserRouter } from 'react-router-dom';
import './App.css';
import MainRouter from './MainRouter';
import "./index.css"
function App() {
  return (
    <BrowserRouter>
        <MainRouter />
    </BrowserRouter>
  );
}

export default App;
