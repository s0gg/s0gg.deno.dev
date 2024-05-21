export default function Home() {
  return (
    <>
      <header>
        <h1>s0gg</h1>
      </header>
      <main class="px-4 py-8 mx-auto">
        <section>
          <h2>About me</h2>
          <p>Software engineer.</p>
        </section>
        <section>
          <h2>Links</h2>
          <ul>
            <li>GitHub: <a href="https://github.com/s0gg" target="_blank">s0gg</a></li>
            <li>Blog: <a href="/posts">/posts</a></li>
          </ul>
        </section>
        <section>
          <h2>Likes</h2>
          <p>Rust, Lisp, CTF, Neovim, Emacs</p>
        </section>
      </main>
    </>
  );
}
