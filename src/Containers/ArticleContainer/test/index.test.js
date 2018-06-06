import React from 'react'
import { ArticleContainer } from '../'
import { shallow } from 'enzyme'

describe("ArticleContainer", () => {
  it("should match snapshot", () => {
    const mockArticle = {
      authors: 'author name',
      title: 'article title',
      datePublished: '01-01-2018',
      fullText: 'full article text',
      topics: 'article topics',
      fullTextIdentifier: 'link-to-fulltext.com'
    }
    const wrapper = shallow(<ArticleContainer fullArticleSuccess={mockArticle}/>)
    expect(wrapper).toMatchSnapshot()
  });

  it("should have default state", () => {
    const mockArticle = {
      authors: 'author name',
      title: 'article title',
      datePublished: '01-01-2018',
      fullText: 'full article text',
      topics: 'article topics',
      fullTextIdentifier: 'link-to-fulltext.com'
    }
    const wrapper = shallow(<ArticleContainer fullArticleSuccess={mockArticle}/>)
    const expected = {
      toggleText: false
    }

    expect(wrapper.state()).toEqual(expected)
  });

  it("should toggle text", () => {
    const mockArticle = {
      authors: 'author name',
      title: 'article title',
      datePublished: '01-01-2018',
      fullText: 'full article text',
      topics: 'article topics',
      fullTextIdentifier: 'link-to-fulltext.com'
    }
    const wrapper = shallow(<ArticleContainer fullArticleSuccess={mockArticle}/>)
    const expected = {
      toggleText: true
    }
    wrapper.find('.lbl-toggle').simulate('click')

    expect(wrapper.state()).toEqual(expected)
  });
  it("should call loading station while loading", () => {
    const mockArticle = {
      authors: 'author name',
      title: 'article title',
      datePublished: '01-01-2018',
      fullText: 'full article text',
      topics: 'article topics',
      fullTextIdentifier: 'link-to-fulltext.com'
    }
    const wrapper = shallow(<ArticleContainer fullArticleLoading={true} fullArticleSuccess={mockArticle}/>)

    expect(wrapper.instance().loadingStation).toHaveBeenCalled
  });

  it("should call loading station while loading", () => {
    const mockArticle = {
      authors: 'author name',
      title: 'article title',
      datePublished: '01-01-2018',
      fullText: 'full article text',
      topics: 'article topics',
      fullTextIdentifier: 'link-to-fulltext.com'
    }
    const wrapper = shallow(<ArticleContainer fullArticleLoading={false} fullArticleSuccess={mockArticle}/>)

    expect(wrapper.instance().cleanFullArticle).toHaveBeenCalled
  });
});
