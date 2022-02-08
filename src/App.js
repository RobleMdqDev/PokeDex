
import './App.css';
import Router from './Router';
import LayoutScreen from './screens/LayoutScreen';

function App() {
   
  return (
    <div className="App">
      <LayoutScreen>
        <Router />
      </LayoutScreen>      
    </div>
  );
}

export default App;
