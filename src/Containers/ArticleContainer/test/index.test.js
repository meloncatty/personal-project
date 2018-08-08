import React from 'react'
import { ArticleContainer, mapStateToProps } from '../'
import { shallow } from 'enzyme'
import * as mockData from '../../../__mocks__/mockData'

describe('ArticleContainer', () => {
  let mockProps
  let articleContainer

  beforeEach(() => {
    mockProps = {
      fullArticleSuccess: mockData.fullText[0],
      fullArticleLoading: false,
      fullArticleErrored: false
    }
    articleContainer = shallow(<ArticleContainer {...mockProps} />)
  })

  it('should match snapshot', () => {
    expect(articleContainer).toMatchSnapshot()
  })

  it('should match snapshot when article is loading', () => {
    mockProps.fullArticleLoading = true
    articleContainer = shallow(<ArticleContainer {...mockProps} />)

    expect(articleContainer).toMatchSnapshot()
  })

  it('should match snapshot when article fetch has errored', () => {
    mockProps.fullArticleErrored = true
    articleContainer = shallow(<ArticleContainer {...mockProps} />)

    expect(articleContainer).toMatchSnapshot()
  })

  it('should have default state', () => {
    const expected = {
      toggleText: false
    }

    expect(articleContainer.state()).toEqual(expected)
  })

  it('should toggle text when text is closed', () => {
    const expected = {
      toggleText: true
    }
    articleContainer.find('.lbl-toggle').simulate('click')

    expect(articleContainer.state()).toEqual(expected)
  })

  it('should toggle text when text is opened', () => {
    const expected = {
      toggleText: false
    }
    articleContainer.find('.lbl-toggle').simulate('click')
    articleContainer.update()
    articleContainer.find('.lbl-toggle').simulate('click')
    articleContainer.update()

    expect(articleContainer.state()).toEqual(expected)
  })

  it('should display download link when available', () => {
    expect(articleContainer.find('.download-article').length).toEqual(1)
  })

  describe('mapStateToProps', () => {
    describe('fullArticleSuccess', () => {
      it('should return an article object', () => {
        const mockState = {
          fullArticleSuccess: {
            title: 'article title',
            id: '4',
            description: 'article description'
          },
          type: 'USER_AUTHENTICATON'
        }

        const expected = {
          fullArticleSuccess: {
            title: 'article title',
            id: '4',
            description: 'article description'
          }
        }

        const mappedProps = mapStateToProps(mockState)
        expect(mappedProps).toEqual(expected)
      })
    })

    describe('fullArticleErrored', () => {
      it('should return true if full article has errored', () => {
        const mockState = {
          fullArticleErrored: true,
          type: 'FULL_ARTICLE_LOADING'
        }

        const expected = {
          fullArticleErrored: true
        }

        const mappedProps = mapStateToProps(mockState)
        expect(mappedProps).toEqual(expected)
      })
    })

    describe('fullArticleLoading', () => {
      it('should return true if full article text is loading', () => {
        const mockState = {
          fullArticleLoading: true,
          type: 'FULL_ARTICLE_LOADING'
        }

        const expected = {
          fullArticleLoading: true
        }

        const mappedProps = mapStateToProps(mockState)
        expect(mappedProps).toEqual(expected)
      })
    })
  })
})
