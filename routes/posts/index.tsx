import { Handlers, PageProps } from "$fresh/server.ts";
import { extract } from "$std/front_matter/yaml.ts";
import { join } from "$std/path/mod.ts";

interface Post {
  slug: string;
  title: string;
  content: string;
}

async function getPost(slug: string): Promise<Post | null> {
  const text = await Deno.readTextFile(join('./routes/posts', `${slug}.md`));
  const { attrs, body } = extract(text);
  return {
    slug,
    title: attrs.title,
    content: body,
  }
}

async function getPosts(): Promise<Post[]> {
  const files = Deno.readDir('./routes/posts');
  const promises = [];
  for await (const file of files) {
    if (!file.name.endsWith('.md')) { continue; }
    const slug = file.name.replace('.md', '');
    promises.push(getPost(slug));
  }
  const posts = await Promise.all(promises) as Post[];
  return posts;
}

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const posts = await getPosts();
    return ctx.render(posts);
  },
}

function PostCard(props: { post: Post }) {
  const { post } = props;

  return (
    <div class="py-8">
      <a href={`/posts/${post.slug}`}>
        <h3>{post.title}</h3>
      </a>
    </div>
  );
}

export default function BlogIndexPage(props: PageProps<Post[]>) {
  const posts = props.data;

  return (
    <>
      <main>
        <h2>Blog</h2>
        <div>
          {posts.map((post) => <PostCard post={post} />)}
        </div>
      </main>
    </>
  );
}
