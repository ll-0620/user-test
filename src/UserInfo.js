import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './UserInfo.css'
import { useLocation, useNavigate } from 'react-router-dom';


/**
 * UserInfo: 用戶信息
 * 默認: ll-0620
 * */


//跳轉連接 repos.html_url

function UserInfo() {
  const user_data = useLocation().state
  const navigation = useNavigate()
  const [click, setclick] = useState(false)

  useEffect(() => {
    const data = {
      repos_url: user_data.github_repository,
      user: user_data.username
    }
    if (click === true) {
      navigation(`/user/${user_data.username}/repos`, { state: data }) 
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[click])



  return (
    <div>
      <h2 className='row-in-line'>
        User
        <img className='userImg' src={require("./image/game.png")} alt='user' />
        {user_data.username}
      </h2>
      <ul>
        <li>Location: {user_data.location}</li>
        <li>followers: {user_data.followers} </li>
        <li>following: {user_data.following} </li>
        <li>github page: {" "}
          <a href={user_data.github_page} target="_blank" rel="noreferrer">
            {user_data.github_page}
          </a>
        </li>
        <li>github repositories: {user_data.public_repos}</li>
        <p className="look" onClick={() => setclick(true)}>
          p.s. Click here for more github repositories' details
        </p>
      </ul>
    </div>
  )  
}

export default UserInfo