import { fetchServerData } from "@/lib/serverFetch";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

async function PostsOverview() {
  try {
    const posts = await fetchServerData<Post[]>('https://jsonplaceholder.typicode.com/posts');

    return (
      <div className="grid gap-4 p-4">
        <h2 className="text-2xl font-bold mb-4">Posts Overview</h2>
        {posts.map((post) => (
          <article key={post.id} className="border rounded-lg p-4 hover:shadow-lg">
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <p className="text-gray-600 mt-2">{post.body}</p>
          </article>
        ))}
      </div>
    );
  } catch (err: unknown) {
    console.error('Failed to fetch posts:', err);
    return (
      <div className="grid gap-4 p-4">
        <h2 className="text-2xl font-bold mb-4">Posts Overview</h2>
        <p className="text-red-500">Failed to load posts</p>
      </div>
    );
  }
}

export default PostsOverview;
