/* eslint-disable */
export type RssArticle = {
  link: string;
  title: string;
  description: string;
  published: number;
  enclosure?: string | undefined;
}

export type RssArticleArray = RssArticle[]
