import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import UserInfo from './UserInfo';
import SearchUserPage from './Search';
import ReposLists from './ReposLists'
import ReposInfo from './ReposInfo';

/*Home_page */
function Home() {
  return (
    <div className="home">
      <img className='pageImg' src={require("./image/rabbit.png")} alt='lai mao' />
      <p>HELLO! This is home page.</p>
      <ul className='home-list'>
        <li>
          <Link to='/user'>
            Click here for searching github user's information
          </Link>
        </li>
      </ul>
    </div>
  )
}

/**404_page */
function Page404(){
  return (
    <div>
      頁面不存在^_^
    </div>
  )
}

  
function App() {
  return (
    <Router>
      <nav style={{margin: 10}}>
        <Link to='/' style={{ marginRight: 10 }}>Home</Link>
        <Link to='/user' style={{ marginRight: 10 }}>Search user</Link>
      </nav>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/user' element={<SearchUserPage />} />
        <Route path='/user/:username' element={<UserInfo />} />
        <Route path='/user/:username/repos' element={<ReposLists />} />
        <Route path='/user/:username/repos/:repo' element={<ReposInfo />} />
        <Route path='*' element={<Page404 />} />
      </Routes>
    </Router>
  );
}

export default App;
