import React,{useState,useEffect} from 'react'
import axios from 'axios'
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

const PostList = () => {
    const [posts,setPosts] = useState({});

    
    const fetchPosts = async() => {
        const res = await axios.get('http://localhost:4000/posts')
        
        setPosts(res.data);
    }
    useEffect(()=> {
        fetchPosts();
    },[])

    const renderedPosts = Object.values(posts).map(post => {
        return (
        <div className='flex items-center w-3/10 mb-5 bg-red-500 text-slate-100 rounded-2xl p-2 ' key={post.id} >
            <div className='my-2'>
                <h3 className='text-[24px] font-semibold'>{post.title}</h3>
                <CommentList postId={post.id} />
                <CommentCreate postId={post.id} />
            </div>
        </div>
        )
    })
    return (
        <div className='flex flex-row flex-wrap justify-between'>
            {renderedPosts}
        </div>
    )
}

export default PostList