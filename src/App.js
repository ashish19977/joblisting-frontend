import './App.css';
import '../node_modules/antd/dist/antd.css';
import HeaderCom from './components/Header'
import JobsCom from './components/Jobs'


function App() {
  return (
    <div className="App">
      <HeaderCom title = "Job Listing App"/>
      <JobsCom/>
    </div>
  );
}

export default App;
