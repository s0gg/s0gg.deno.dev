import { Handlers, PageProps } from "$fresh/server.ts";
import { extract } from "$std/front_matter/yaml.ts";
import { CSS, render } from "$gfm";
import { Head } from "$fresh/runtime.ts";

interface Page {
  markdown: string;
  data: Record<string, unknown>;
}

export const handler: Handlers<Page> = {
  async GET(_req, ctx) {
    let rawMarkdown = "";
    try {
      rawMarkdown = await Deno.readTextFile(`./routes/posts/${ctx.params.slug}.md`);
    } catch(e) {
      console.log(e);
      return ctx.render(undefined);
    };
    const { attrs, body } = extract(rawMarkdown);
    return ctx.render({ markdown: body, data: attrs });
  },
};

export default function MarkdownPage({ data }: PageProps<Page | null>) {
  if (!data) {
    return <h1>File not found.</h1>;
  }

  return (
    <>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
    </Head>
    <main>
    <div
      class="markdown-body"
    dangerouslySetInnerHTML={{ __html: render(data?.markdown) }}
    />
    </main>
    </>
  );
}
