import Head from 'next/head';
import Layout, { SITE_TITLE } from '../components/layout';
import utilStyles from '../styles/utils.module.css'

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{SITE_TITLE}</title>
      </Head>

      <section>
        <p>Hello, I'm Min Aung Thu Win. Now, I'm learning Next.js to improve my web development skill.</p>

        <p>
          (This is the sample website - you'll be building a site like this on {' '})
          < a href='https://nextjs.org/learn'>Our Next.js tutorial</a>.
        </p>
      </section>
    </Layout >
  )
}
