import { type PageProps } from "$fresh/server.ts";
export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>s0gg.net</title>
        <meta name="description" content="s0gg's website" />
        <meta property="og:url" content="https://s0gg.net" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="s0gg.net" />
        <meta property="og:description" content="s0gg's website" />
        <meta property="og:site_name" content="s0gg.net" />
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
