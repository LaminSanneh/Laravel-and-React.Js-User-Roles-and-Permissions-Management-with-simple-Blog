import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { createPost } from "../store/slices/postSlice";
import { useNavigate } from "react-router-dom";

const AddPostComponent = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const handleSubmitCreatePostForm = () => {};
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector((state) => state.post.loading);

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const onBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value)
  }

  const handleAddPostSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(createPost({title, body})).unwrap().then(() => {
        navigate("/posts");
    }).catch((response) => {
        console.log(`Error creating post: ${response.message}`);
    })
  }

  const cancleAddPost = () => {
    navigate("/posts");
  };

  if (loading) {
    return <h2 className="text-3xl">...Loading</h2>;
  }

  return (
    <div>
      <h2 className="text-3xl mb-4 text-left pl-8 pt-4">Add new post</h2>
      <form onSubmit={handleAddPostSubmit} action="" className="pl-8 pr-8 pt-4 w-2/3">
        <input
          placeholder="title"
          name="title"
          className="block border p-2 rounded-md focus:ring-sky-400 mb-6 w-full"
          type="text"
          onChange={onTitleChange}
        />
        <textarea onChange={onBodyChange} placeholder="body" className="block border p-2 rounded-md w-full mb-4" name="" id=""></textarea>
        <div className="flex gap-4 mb-4 justify-between">
          <button className="bg-red-500 text-white" onClick={cancleAddPost}>
            Cancel
          </button>
          <button
            className="bg-green-500 text-white"
            onClick={() => handleSubmitCreatePostForm()}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPostComponent;
