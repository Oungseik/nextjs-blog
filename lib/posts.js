import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import remarkParse from 'remark-parse';
import rehypeKatex from 'rehype-katex';
import rehypeDocument from 'rehype-document';
import rehypeStringify from 'rehype-stringify';

import rehypePrism from 'rehype-prism';

const postDirectory = path.join(process.cwd(), 'posts');

export function getSortedData() {
  const fileNames = fs.readdirSync(postDirectory);
  const allPostData = fileNames.map(fileName => {
    const id = fileName.replace(/.md$/, '');

    const fullPath = path.join(postDirectory, fileName);
    const fileContent = fs.readFileSync(fullPath, 'utf-8');

    const matterResult = matter(fileContent);
    return {
      id,
      ...matterResult.data,
    }
  })

  // sort by date 
  return allPostData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  })

}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postDirectory);
  return fileNames.map(fileName => ({
    params: {
      id: fileName.replace(/.md$/, ''),
    }
  }))
}

export async function getPostData(id) {
  const fullPath = path.join(postDirectory, `${id}.md`);
  const fileContent = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContent);
  const processedContent = await remark()
    .use(remarkParse)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeDocument, {
      css: 'https://cdn.jsdelivr.net/npm/katex@0.15.0/dist/katex.min.css'
    })
    .use(rehypeKatex)
    .use(rehypePrism)
    .use(rehypeStringify)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();


  return {
    id,
    ...matterResult.data,
    contentHtml,
  }
}
