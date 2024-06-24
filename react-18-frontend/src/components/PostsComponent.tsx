import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { deletePost, fetchPosts } from "../store/slices/postSlice";
import moment from "moment";
import { Link } from "react-router-dom";

const PostsComponent = () => {
  const { posts, loading } = useAppSelector((state) => {
    return state.post;
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("Fetching posts");

    dispatch(fetchPosts())
      .unwrap()
      .then((response) => {
        console.log(`${response.length} Posts fetched successfully`);
      })
      .catch((response) => {
        console.log(`Error fetching posts: ${response.message}`);
      });
  }, [dispatch]);

  const handlePostDeleteClick = (id: number) => {
    const deletePostConfirm = confirm(
      "Are you sure you wnat to delete this post?"
    );

    if (!deletePostConfirm) {
      return;
    }

    dispatch(deletePost(id))
      .unwrap()
      .then(() => {})
      .catch(() => {
        console.log("Error deleting post");
      });
  };

  if (loading) {
    return <h2 className="text-3xl">...Loading</h2>;
  }

  return (
    <>
      <h2 className="text-3xl mb-4 text-left pl-8 pt-4">Posts List</h2>
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-slate-50">
            <th className="p-4 pl-8 pb-3 text-slate-400 text-left border-b">
              Title
            </th>
            <th className="p-4 pl-8 pb-3 w-20 text-slate-400 text-left border-b">
              Body
            </th>
            <th className="p-4 pl-8 pb-3 text-slate-400 text-left border-b">
              Creator
            </th>
            <th className="p-4 pl-8 pb-3 text-slate-400 text-left border-b">
              Created At
            </th>
            <th className="p-4 pl-8 pb-3 text-slate-400 text-left border-b">
              Updated At
            </th>
            <th className="p-4 pl-8 pb-3 text-slate-400 text-left border-b">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {posts.map((post, index) => {
            return (
              <tr key={index}>
                <td className="p-4 text-left pl-8 text-slate-500 border-b border-slate-100">
                  {post.title}
                </td>
                <td className="p-4 text-left w-20 pl-8 text-slate-500 border-b border-slate-100">
                  {post.body.substring(0, 30)}
                </td>
                <td className="p-4 text-left pl-8 text-slate-500 border-b border-slate-100">
                  {post.author.name}
                </td>
                <td className="p-4 text-left pl-8 text-slate-500 border-b border-slate-100">
                  {moment(post.created_at).format("MMMM Do YYYY h:mm A")}
                </td>
                <td className="p-4 text-left pl-8 text-slate-500 border-b border-slate-100">
                  {moment(post.updated_at).format("MMMM Do YYYY h:mm A")}
                </td>
                <td className="p-4 text-left pl-8 text-slate-500 border-b border-slate-100">
                  <Link
                    to={`/posts/edit/${post.id}`}
                    className="rounded-lg hover:cursor-pointer p-2 bg-sky-500 text-white font-bold"
                  >
                    Edit Post
                  </Link>
                  <a
                    onClick={() => {
                      handlePostDeleteClick(post.id);
                    }}
                    className="rounded-lg hover:cursor-pointer p-2 bg-red-500 text-white font-bold ml-4"
                  >
                    Delete Post
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default PostsComponent;
