import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './Repos.css'

// {組件}倉庫-信息
function ReposInfo() {
  const getInfo = useLocation().state
  const [isLoaded, setIsLoaded] = useState(false)
  const [repoInfo, setRepoInfo] = useState({})

  useEffect(() => {
    axios.get(`https://api.github.com/repos/${getInfo.repo_user}/${getInfo.repo_name}`).then(function (response) {
      const list = response.data
      setRepoInfo ({
        full_name: list.full_name,
        description: list.description,
        stargazers: list.stargazers_count,
        language: list.language,
        pageURL: list.html_url 
      });
      setIsLoaded(true)
    }).catch(function (error) {
      console.log(error);
      setRepoInfo({ error: error });
      setIsLoaded(false)
    }) 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!isLoaded) {
    return (
      <p> loading....</p>
    )
  } else {
    return (
      <div>
        <h2 className='row-in-line'>
          <img className='userImg' src={require("./image/winner.png")} alt='end' />
          {getInfo.repo_name}
        </h2>
        <ul>
          <li>owner: {getInfo.repo_user}</li>
          <li>full_name: {repoInfo.full_name}</li>
          <li>language: {repoInfo.language}</li>
          <li>stargazers: {repoInfo.stargazers}</li>
          <li>description: {repoInfo.description}</li>
          <li>github_page: <a href={repoInfo.pageURL} target="_blank" rel="noreferrer">
            {repoInfo.pageURL}
          </a>
          </li>
        </ul>
      </div>
    )    
  }

}


export default ReposInfo