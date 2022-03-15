import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import './Repos.css'

// {組件}用戶倉庫列表-點擊名稱查看信息
/**
 * 
 */

let page = 1

function ReposLists() {
  const repos_data = useLocation().state
  const [repos, setRepos] = useState({}) //數據列表
  const [isLoaded, setIsLoaded] = useState(false)
  const [click, setClick] = useState(false)
  const [num, setNum] = useState(-1)
  const navigation = useNavigate();


  // 處理懶加載
  const [hasMore, setHasMore] = useState(true) //判斷API是否還有數據，通過接口設置。 
  const [getPage, setGetPage] = useState(1)
  
  const GetData = () => {
    if(!hasMore) return
    axios.get(repos_data.repos_url, {
      params: {
        per_page: 10,
        page: getPage
      }
    }).then(function (response) {
      if (response.data.length<10) {
        setHasMore(false)
        return
      } 
      let temp = repos.list || []
      setRepos({
        list: temp.concat(response.data),
      });
      setIsLoaded(true)
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
            <td className='look' onClick={() => {
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
  
  //當組件輸出到 DOM 後會執行 componentDidMount()
  useEffect(() => {
    if (click === true) {
      const repo = repos.list[num]
      navigation(`/user/${repos_data.user}/repos/${repo.name}`, {
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
        <p className="user">user: {repos_data.user}</p>
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
        <p id="end">page {getPage}<i class="fas fa-allergies    "></i></p>
      </div>
    )
  }
}

export default ReposLists