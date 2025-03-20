declare module "@pagefind/default-ui" {
  declare class PagefindUI {
    constructor(opts: {
      element?: string | HTMLElement,
      bundlePath?: string,
      pageSize?: number,
      resetStyles?: boolean,
      showImages?: boolean,
      showSubResults?: boolean,
      excerptLength?: number,
      processResult?: any,
      processTerm?: any,
      showEmptyFilters?: boolean,
      debounceTimeoutMs?: number,
      mergeIndex?: any,
      translations?: any,
      autofocus?: boolean,
      sort?: any,
    })
  }
}

interface Frontmatter {
  title: string
  pubDate: Date
  description: string
  author: string
  tags: string[]
}

interface WorkFrontmatter {
  title: string
  description: string
  developedAt: string
  techs?: string[]
  tags?: string[]
}

interface PostFrontmatter {
  title: string
  publishedAt: Date
  modifiedAt: Date
  description: string
  lastModified: string
  series: string
  category: string
  tags?: string[]
}