import { parse } from 'rss-to-json'
import config from '@/config/config'

export interface RssArticle {
  link: string
  title: string
  description: string
  created: number | undefined
  published: number | undefined
  enclosure: string | undefined
}

export const useRss = async (path: string) => {
  const feed = await parse(`${config.mcreinfoProxyHost}/${path}`)
  const articles: RssArticle[] = feed.items.map((item) => {
    return {
      link: item.link,
      title: item.title,
      description: item.description
        .trim()
        .replaceAll('\n', '<br>')
        .replaceAll(/<a[^>]*href=["']([^"']*)["']>続きをみる<\/a>/g, '')
        .replaceAll(/<figure.*?>.*?<\/figure>/g, '')
        .replaceAll(/<(p).*?>/g, '')
        .replaceAll(/<\/(p)>/g, '')
        .replaceAll(/<(h2).*?>/g, '<b>')
        .replaceAll(/<\/(h2)>/g, '</b><br>'),
      created: item.created,
      published: item.published,
      enclosure: (() => {
        if (!item.enclosures) return undefined
        if (!item.enclosures[0]) return undefined
        if (item.enclosures[0].url) return item.enclosures[0].url as string
        return item.enclosures[0] as string
      })(),
    }
  })
  return articles
}
