import React from 'react'
import PostCreate from './PostCreate'
import PostList from './PostList'

// add postcreate component
const App = () => {
  return (
    <div className='font-poppins m-5 '>
      <div className='pb-10'>
        <h1 className='font-bold'>Create Post</h1>
        <PostCreate/>
      </div>
      <div>
        <h1 className='font-bold'>Posts</h1>
        <PostList />
      </div>
    </div>
  )
}

export default App