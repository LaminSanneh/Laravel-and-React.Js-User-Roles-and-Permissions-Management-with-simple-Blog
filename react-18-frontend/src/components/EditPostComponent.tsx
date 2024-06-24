import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchPost, updatePost } from "../store/slices/postSlice";
import { useNavigate, useParams } from "react-router-dom";

const EditPostComponent = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const handleSubmitCreatePostForm = () => {};
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const route = useParams();
  const loading = useAppSelector((state) => state.post.loading);

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value);
  };

  const handleEditPostSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(updatePost({ title, body, id: Number(route.id) }))
      .unwrap()
      .then(() => {
        navigate("/posts");
      })
      .catch((response) => {
        console.log(`Error creating post: ${response.message}`);
      });
  };

  const cancleUpdatePost = () => {
    navigate("/posts");
  };

  useEffect(() => {
    let ignoreFetchedPostData = false;

    if (!route.id) {
      return;
    }

    dispatch(fetchPost(Number.parseInt(route.id, 10)))
      .unwrap()
      .then((response) => {
        if (ignoreFetchedPostData) {
          setTitle(response.title);
          setBody(response.body);
        }
      })
      .catch(() => {
        console.log("Error fetching post");
      });

    return () => {
      console.log("Clearing Use effect");

      ignoreFetchedPostData = true;
    };
  }, [route, dispatch]);

  if (loading) {
    return <h2 className="text-3xl">...Loading</h2>;
  }

  return (
    <div>
      <h2 className="text-3xl mb-4 text-left pl-8 pt-4">Edit Post</h2>
      <form
        onSubmit={handleEditPostSubmit}
        action=""
        className="pl-8 pr-8 pt-4 w-100"
      >
        <input
          placeholder="title"
          name="title"
          className="block border p-2 rounded-md focus:ring-sky-400 mb-6 w-full"
          type="text"
          value={title}
          onChange={onTitleChange}
        />
        <textarea
          onChange={onBodyChange}
          placeholder="body"
          className="block border p-2 rounded-md w-full mb-4"
          name="body"
          value={body}
        ></textarea>
        <div className="flex gap-4 mb-4 justify-between">
          <a className="p-4 hover:cursor-pointer rounded-lg bg-red-500 text-white" onClick={cancleUpdatePost}>
            Cancel
          </a>
          <button
            className="bg-green-500 text-white"
            onClick={() => handleSubmitCreatePostForm()}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPostComponent;
