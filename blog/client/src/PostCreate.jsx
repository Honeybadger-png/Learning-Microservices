import React, { useState } from 'react';
import axios from 'axios';

// there will be a basic post create div

const PostCreate = () => {
  const [title, setTitle] = useState('');

  const postSubmit = async (event) => {
    event.preventDefault();
    // axios değişecek
    await axios
      .post('http://posts.com/posts/create', {
        title,
      })
      .then(setTitle(''));
  };

  return (
    <div className="flex  my-2">
      <form className="p-2 w-3/12" onSubmit={postSubmit}>
        <div className="w-full h-full justify-center">
          <label className="font-bold text-[24px] mr-5">Title :</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="border-2 p-2 px-3 border-gray-950 rounded-2xl w-8/12 "
          />
        </div>
        <button className="bg-red-500 px-5 py-2 rounded-2xl"> Submit </button>
      </form>
    </div>
  );
};

export default PostCreate;
