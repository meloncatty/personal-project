import React from 'react'
import { ArticleContainer } from '../'
import { shallow } from 'enzyme'

describe('ArticleContainer', () => {
  it('should match snapshot', () => {
    const mockArticle = {
      authors: 'author name',
      title: 'article title',
      datePublished: '01-01-2018',
      fullText: 'full article text',
      topics: 'article topics',
      fullTextIdentifier: 'link-to-fulltext.com'
    }
    const wrapper = shallow(<ArticleContainer fullArticleSuccess={mockArticle} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should have default state', () => {
    const mockArticle = {
      authors: 'author name',
      title: 'article title',
      datePublished: '01-01-2018',
      fullText: 'full article text',
      topics: 'article topics',
      fullTextIdentifier: 'link-to-fulltext.com'
    }
    const wrapper = shallow(<ArticleContainer fullArticleSuccess={mockArticle} />)
    const expected = {
      toggleText: false
    }

    expect(wrapper.state()).toEqual(expected)
  })

  it('should toggle text when text is closed', () => {
    const mockArticle = {
      authors: 'author name',
      title: 'article title',
      datePublished: '01-01-2018',
      fullText: 'full article text',
      topics: 'article topics',
      fullTextIdentifier: 'link-to-fulltext.com'
    }
    const wrapper = shallow(<ArticleContainer fullArticleSuccess={mockArticle} />)
    const expected = {
      toggleText: true
    }
    wrapper.find('.lbl-toggle').simulate('click')

    expect(wrapper.state()).toEqual(expected)
  })

  it('should toggle text when text is opened', () => {
    const mockArticle = {
      authors: 'author name',
      title: 'article title',
      datePublished: '01-01-2018',
      fullText: 'full article text',
      topics: 'article topics',
      fullTextIdentifier: 'link-to-fulltext.com'
    }
    const wrapper = shallow(<ArticleContainer fullArticleSuccess={mockArticle} />)
    const expected = {
      toggleText: false
    }
    wrapper.find('.lbl-toggle').simulate('click')
    wrapper.update()
    wrapper.find('.lbl-toggle').simulate('click')
    wrapper.update()

    expect(wrapper.state()).toEqual(expected)
  })

  it('should call loading station while loading', () => {
    const mockArticle = {
      authors: 'author name',
      title: 'article title',
      datePublished: '01-01-2018',
      fullText: 'full article text',
      topics: 'article topics',
      fullTextIdentifier: 'link-to-fulltext.com'
    }
    const wrapper = shallow(<ArticleContainer fullArticleLoading fullArticleSuccess={mockArticle} />)

    expect(wrapper.instance().loadingStation).toHaveBeenCalled
  })

  it('should call loading station while loading', () => {
    const mockArticle = {
      authors: 'author name',
      title: 'article title',
      datePublished: '01-01-2018',
      fullText: 'full article text',
      topics: 'article topics',
      fullTextIdentifier: 'link-to-fulltext.com'
    }
    const wrapper = shallow(<ArticleContainer fullArticleLoading={false} fullArticleSuccess={mockArticle} />)

    expect(wrapper.instance().cleanFullArticle).toHaveBeenCalled
  })

  it('should display error if article errors', () => {
    const mockArticle = {
      authors: 'author name',
      title: 'article title',
      datePublished: '01-01-2018',
      fullText: 'full article text',
      topics: 'article topics',
      fullTextIdentifier: 'link-to-fulltext.com'
    }
    const wrapper = shallow(<ArticleContainer fullArticleErrored fullArticleSuccess={mockArticle} />)

    expect(wrapper.find('.error-container').length).toEqual(1)
  })

  it('should display download link when available', () => {
    const mockArticle = {
      authors: 'author name',
      title: 'article title',
      datePublished: '01-01-2018',
      fullText: 'full article text',
      topics: 'article topics',
      fulltextIdentifier: 'link-to-fulltext.com'
    }
    const wrapper = shallow(<ArticleContainer fullArticleLoading={false} fullArticleSuccess={mockArticle} />)

    expect(wrapper.find('.download-article').length).toEqual(1)
  })
})
