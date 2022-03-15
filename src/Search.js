import React, { useState, useEffect } from 'react';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import './Search.css'
import { useNavigate } from 'react-router-dom';


/**
 * 搜索功能(查詢github用戶名)
 * 默認: ll-0620
 * */

const username = 'll-0620' //查詢的用戶

function SearchUserPage() {
  const [user, setUser] = useState({});
  const navigation = useNavigate();
  const [count, setCount] = useState(0)

  const search = () => {
    const input=document.getElementById("input").value || username 
    axios.get(`https://api.github.com/users/${input}`).then(function (response) {
      setUser({
        username: response.data.login,
        location: response.data.location || "unknown",
        followers: response.data.followers || 0,
        following: response.data.following || 0,
        github_page: response.data.html_url,
        public_repos: response.data.public_repos || 0,
        github_repository: response.data.repos_url
      })
      setCount(1)
    }).catch(function (error) {
      console.log(error.response)
      document.getElementById('none').innerText=`Search User ERROR: ${error.response.data['message']}`    
    })
  }

  useEffect(() => {
    if (count !== 0) {
      navigation(`/user/${user.username}`, { state: user });  
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count])
  
  return (
    <div className="search-box">
      <img className='userImg' src={require("./image/cat.png")} alt='user' />
      <label>User name</label>
      <input id="input" name="name" placeholder={username} />
      <button className="search-user" onClick={() => { search() }}>search</button>
      <div id="none"></div>
    </div>
  )
}

export default SearchUserPage