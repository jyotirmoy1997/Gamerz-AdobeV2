import './App.css'
import { Routes, Route } from "react-router-dom"
import Navigation from './routes/navigation/navigation.routes'
import Home from './routes/home/home.routes'
import UpdatePost from './components/update-post/update-post.component'
import LogIn from './components/log-in/log-in.component'
import TimeLine from './components/timeline/timeline.component'
import NewsFeed from './components/news-feed/news-feed.component'
import { useSelector } from 'react-redux'
import { userStatus } from './features/user/userSlice'
import NotFoundRoute from './routes/not-found/not-found.routes'
import { Fragment } from 'react'
import ExistingLogin from './routes/existing-login/existing-login.component'
import UpdateUser from './components/update-user/update-user.component'

const App = () => {
  const userAvailable = useSelector(userStatus) === "loggedIn"

  return (
    <Routes>
      {userAvailable ? ( <Fragment >

        <Route path='/' element={<Navigation/>}>
         <Route index={true} element={<ExistingLogin />} />
          <Route path="/log-in" element={<ExistingLogin />} />
          <Route path="/user/timeline" element={<TimeLine />} />
          <Route path="/user/update-user" element={<UpdateUser />} />
          <Route path="/user/newsfeed" element={<NewsFeed />} />
          <Route path="/posts">
            <Route path=":postId" element={<UpdatePost />} />
          </Route>
      </Route>
      </Fragment>) : <Route path='/' element={<Navigation/>}>
         <Route index={true} element={<Home />} />
          <Route path="/log-in" element={<LogIn />} />
      </Route>}
      
      <Route path='*' element={<NotFoundRoute />}/>
    </Routes>
  )
}
  

export default App
