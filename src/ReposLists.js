import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import './Repos.css'

// {組件}用戶倉庫列表-點擊名稱查看更多

let page = 1

function ReposLists() {
  const repos_data = useLocation().state
  const [repos, setRepos] = useState({}) //數據列表
  const [isLoaded, setIsLoaded] = useState(false)
  const [click, setClick] = useState(false)
  const [num, setNum] = useState(-1)
  const navigation = useNavigate();

  // 處理lazy load
  const [hasMore, setHasMore] = useState(true) //判斷是否還有數據。 
  const [getPage, setGetPage] = useState(1) 

  const End = () => {
    setHasMore(false)
    return
  }
  
  const GetData = () => {
    if(!hasMore) return
    axios.get(repos_data.repos_url, {
      params: {
        per_page: 10,
        page: getPage
      }
    }).then(function (response) {
      if (repos_data === []) End()
      let temp = repos.list || []
      setRepos({
        list: temp.concat(response.data),
      });
      setIsLoaded(true)
      if (response.data.length < 10) End()
      page++
    }).catch(function (error) {
      console.log(error);
      setRepos({ error: error });
      setIsLoaded(false)
    }) 
  }

  // repository 列表組件
  const Data = (repos) => {
    return (
      repos.map((repos, i) => {
        return (
          <tr key={i} className='hi'>
            <td>{i+1}</td>
            <td id='look' onClick={() => {
              setNum(i)
              setClick(true)
            }}>{repos.name}</td>
            <td>{repos.stargazers_count}</td>
            <td className='block'>{repos.description}</td>
          </tr>
        ) 
      })
    )  
  }

  const handleScroll = () => {
    if (!hasMore) {
      return
    }
    //獲取頁面頂部被卷起來的高度
    const scroll = document.getElementById('scroll');
    const scrollTop = scroll.scrollTop;
    const tableHeight = scroll.scrollHeight;
    const clientHeight = scroll.clientHeight;
    if (scrollTop + clientHeight >= tableHeight - 10 && isLoaded===true ) {
      setIsLoaded(false)
      setGetPage(page)
    }
  }
  
  //等同於 class 中執行 componentDidMount()
  useEffect(() => {
    if (click === true) {
      const repo = repos.list[num]
      navigation(`/users/${repos_data.user}/repos/${repo.name}`, {
        state: {
          repo_name: repo.name,
          repo_user: repos_data.user
        }
      });
    } else {
      GetData()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[click, getPage])
    
  if (!isLoaded && getPage===1) {
    return <p>loading....</p>
  } else {
    return (
      <div>
        <p className="user row-in-line">
          user
          <img className='userImg' src={require("./image/flag.png")} alt='user' />
          {repos_data.user}
        </p>
        <div className="roll" id="scroll"
          onScrollCapture={() => {handleScroll()}}>
          <table className="table table-bordered">
            <thead>
              <tr className='hi'>
                <th className="text-center">NO.</th>
                <th className="text-center">Repository</th>
                <th className="text-center">stargazers</th>
                <th className='text-center block'>decription</th>
              </tr>
            </thead>
            <tbody>
              {Data(repos.list)}
            </tbody>
          </table>  
        </div>
        <p id="end">page {page}</p>
      </div>
    )
  }
}

export default ReposLists