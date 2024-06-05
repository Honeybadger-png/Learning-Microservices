import React,{useState} from 'react'
import axios from 'axios'

const CommentCreate = ({postId}) => {
    const [content,setContent] = useState('')

    const onSubmit = async(event) =>{
        event.preventDefault();
        await axios.post(`http://posts.com/posts/${postId}/comments`,{
            content
        });
        setContent('')
    }
  return (
    <div className='flex  my-2'>
        <form className='p-2 w-12/12' onSubmit={onSubmit}>
            <div className='w-full h-full justify-center'>
                <label className='font-bold text-[24px] mr-5'>New Comment</label>
                <input value={content} onChange={(e)=> setContent(e.target.value)} className='border-2 p-2 px-3 border-gray-950 rounded-2xl w-8/12 text-black ' type="text" />
                <button className='bg-white text-red-500 font-semibold m-2 p-2 rounded-2xl'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default CommentCreate