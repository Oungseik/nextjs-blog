import Head from 'next/head';
import Link from 'next/link';
import Layout, { SITE_TITLE } from '../components/layout';
import Date from '../components/date';
import utilStyles from '../styles/utils.module.css';
import { getSortedData } from "../lib/posts";

export default function Home({ allPostData }) {
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

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout >
  )
}

export async function getStaticProps() {
  const allPostData = getSortedData();

  return {
    props: {
      allPostData,
    }
  }
}
