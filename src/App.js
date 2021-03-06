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
      <p>HOME PAGE - HELLO!</p>
      <ul className='home-list'>
        <li>
          <Link to='/users'>
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
        <Link to='/users' style={{ marginRight: 10 }}>Search user</Link>
      </nav>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/users' element={<SearchUserPage />} />
        <Route path='/users/:username' element={<UserInfo />} />
        <Route path='/users/:username/repos' element={<ReposLists />} />
        <Route path='/users/:username/repos/:repo' element={<ReposInfo />} />
        <Route path='*' element={<Page404 />} />
      </Routes>
    </Router>
  );
}

export default App;
