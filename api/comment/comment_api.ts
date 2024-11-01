// api/comments.ts
export const fetchComments = async (post_id: string) => {
  const response = await fetch(
    "http://api.koistory.site/api/v1/posts/6cde1bbc-9dfd-46f1-9253-f75d77aecdba/comments"
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data.data.map((item: any) => ({
    id: item.id,
    name: item.name,
    created_at: item.created_at,
    content: item.content,
    avatar: item.avatar || "https://i.pravatar.cc/150?img=1",
  }));
};

export const addComment = async (
  post_id: string,
  user_id: string | undefined,
  content: string
) => {
  const response = await fetch(
    `http://api.koistory.site/api/v1/posts/${post_id}/comments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: content.trim(),
        user_id: user_id,
        post_id: post_id,
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
  }

  return await response.json();
};

export const editComment = async (
  comment_id: string,
  updatedContent: string
) => {
  const response = await fetch(
    `http://api.koistory.site/api/v1/comments/${comment_id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: updatedContent.trim() }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
  }
};

export const deleteComment = async (comment_id: string) => {
  const response = await fetch(
    `http://api.koistory.site/api/v1/comments/${comment_id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to delete comment with ID ${comment_id}`);
  }
};
