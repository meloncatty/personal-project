import {
  resultsSuccess,
  resultsHaveErrored,
  resultsAreLoading,
  resultsTotalHits,
  captureQuery,
  nextPageLoading,
  nextPageErrored,
  nextPageSuccess,
  fullArticleSuccess,
  fullArticleLoading,
  fullArticleErrored,
  userAuthentication,
  captureUserArticles,
  isUserSignedIn,
  userSignupSuccess,
  fetchUserArticlesSuccess,
  fetchUserArticlesLoading,
  fetchUserArticlesErrored
} from '../index.js'

describe('Results reducers', () => {
  describe('resultsSuccess', () => {
    it('should return default state when no action is passed', async () => {
      expect(resultsSuccess([], {})).toEqual([])
    })

    it('should update store with an array of articles ', () => {
      const expected = [
        {
          id: 1,
          title: 'The heart of a combinatorial model category'
        }
      ]
      const mockAction = {
        type: 'QUERY_RESULTS_SUCCESS',
        results: [
          {
            id: 1,
            title: 'The heart of a combinatorial model category'
          }
        ]
      }
        expect(resultsSuccess([], mockAction)).toEqual(expected)
    })
  })

  describe('resultsHaveErrored', () => {
    it('should return default state when no action is passed', () => {
      expect(resultsSuccess(false, {})).toEqual(false)
    })

    it('should update store if results have errored', () => {
      const expected = true
      const mockAction = {
        type: 'RESULTS_HAVE_ERRORED',
        resultsErrored: true
      }

      expect(resultsHaveErrored(false, mockAction)).toEqual(expected)
    })
  })

  describe('resultsAreLoading', () => {
    it('should return default state when no action is passed', () => {
      expect(resultsAreLoading(false, {})).toEqual(false)
    })

    it('should update store if results are loading', () => {
      const expected = true
      const mockAction = {
        type: 'RESULTS_ARE_LOADING',
        resultsLoading: true
      }

      expect(resultsAreLoading(false, mockAction)).toEqual(expected)
    })
  })

  describe("resultsTotalHits", () => {
    it("should return default state when no action is passed", () => {
      expect(resultsTotalHits(null, {})).toEqual(null)
    })

    it("should update store if there are results", () => {
      const expected = 13883
      const mockAction = {
        type: 'RESULTS_TOTAL_HITS',
        totalHits: expected
      }

      expect(resultsTotalHits(null, mockAction)).toEqual(expected)
    })
  })
})

describe("Single article reducers", () => {
  describe("fullArticleSuccess", () => {
    it("should return default state when no action passed", () => {
      expect(fullArticleSuccess([], {})).toEqual([])
    })

    it("should return full article data to store", () => {
      const expected = [
        {
          id: 1,
          title: 'article title',
          fullText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }
      ]
      const mockAction = {
        type: 'FULL_ARTICLE_SUCCESS',
        result: expected
      }

      expect(fullArticleSuccess([], mockAction)).toEqual(expected)
    })
  })

  describe("fullArticleLoading", () => {
    it("should return default state when no action passed", () => {
      expect(fullArticleLoading(false, {})).toEqual(false)
    })

    it("should return true when article is loading", () => {
      const mockAction = {
        type: 'FULL_ARTICLE_LOADING',
        articleLoading: true
      }

      expect(fullArticleLoading(false, mockAction)).toEqual(true)
    })
  })

  describe("fullArticleErrored", () => {
    it("should return default state when no action passed", () => {
      expect(fullArticleErrored(false, {})).toEqual(false)
    })

    it("should return true when article has errored", () => {
      const mockAction = {
        type: 'FULL_ARTICLE_ERRORED',
        articleErrored: true
      }

      expect(fullArticleErrored(false, mockAction)).toEqual(true)
    })
  })
})

describe("User reducers", () => {
  describe("userAuthentication", () => {
    it("should return default state when no action passed", () => {
      expect(userAuthentication([], {})).toEqual([])
    });

    it("should return user UID to store", () => {
      const userAuth = ['919x09v9s8z']
      const mockAction = {
        type: 'USER_AUTHENTICATION',
        userAuth: '919x09v9s8z'
      }

      expect(userAuthentication([], mockAction)).toEqual(userAuth)
    });
  });

  describe("captureUserArticles", () => {
    it("should return default state when no action passed", () => {
      expect(captureUserArticles([], {})).toEqual([])
    });

    it("should return user article IDs to store", () => {
      const userArticleIds = [91903298]
      const mockAction = {
        type: 'CAPTURE_USER_ARTICLES',
        userArticles: 91903298
      }

      expect(captureUserArticles([], mockAction)).toEqual(userArticleIds)
    });
  });

  describe("isUserSignedIn", () => {
    it("should return default state when no action passed", () => {
      expect(isUserSignedIn(false, {})).toEqual(false)
    });

    it("should return true if user signed in", () => {
      const mockAction = {
        type: 'IS_USER_SIGNED_IN',
        isUserSignedIn: true
      }

      expect(isUserSignedIn(false, mockAction)).toEqual(true)
    });
  });

  describe("userSignupSuccess", () => {
    it("should return default state when no action passed", () => {
      expect(userSignupSuccess(false, {})).toEqual(false)
    });

    it("should return true if user signup success", () => {
      const mockAction = {
        type: 'USER_SIGNUP_SUCCESS',
        signupSuccess: true
      }

      expect(userSignupSuccess(false, mockAction)).toEqual(true)
    });
  });

  describe("captureQuery", () => {
    it("should return default state when no action passed", () => {
      expect(captureQuery(null, {})).toEqual(null)
    });

    it("should return user search query to store", () => {
      const userQuery = 'blockchain'
      const mockAction = {
        type: 'CAPTURE_QUERY',
        userQuery
      }

      expect(captureQuery(null, mockAction)).toEqual(userQuery)
    });
  });
});

describe("Fetch user articles reducers", () => {
  describe("fetchUserArticlesSuccess", () => {
    it("should return default state when no action passed", () => {
      expect(fetchUserArticlesSuccess([], {})).toEqual([])
    });

    it("should return user's saved articles", () => {
      const fetchedArticles = [
        {
          id: 1,
          title: 'article title',
          description: 'article description'
        }
      ]

      const mockAction = {
        type: 'FETCH_USER_ARTICLES_SUCCESS',
        fetchedArticles: {
          id: 1,
          title: 'article title',
          description: 'article description'
        }
      }

      expect(fetchUserArticlesSuccess([], mockAction)).toEqual(fetchedArticles)
    });
  });

  describe("fetchUserArticlesLoading", () => {
    it("should return default state when no action passed", () => {
      expect(fetchUserArticlesLoading(false, {})).toEqual(false)
    });

    it("should return true if articles are loading", () => {
      const mockAction = {
        type: 'FETCH_USER_ARTICLES_LOADING',
        fetchUserArticlesLoading: true
      }

      expect(fetchUserArticlesLoading(false, mockAction)).toEqual(true)
    });
  });

  describe("fetchUserArticlesErrored", () => {
    it("should return default state when no action passed", () => {
      expect(fetchUserArticlesErrored(false, {})).toEqual(false)
    });

    it("should return true if articles have errored", () => {
      const mockAction = {
        type: 'FETCH_USER_ARTICLES_ERRORED',
        fetchUserArticlesErrored: true
      }

      expect(fetchUserArticlesErrored(false, mockAction)).toEqual(true)
    });
  });
});

describe("Next page reducers", () => {
  describe("nextPageSuccess", () => {
    it("should return default state when no action passed", () => {
      expect(nextPageSuccess([], {})).toEqual([])
    });

    it("should return next page of results", () => {
      const nextPage = [{
        id: '1',
        title: 'article title',
        description: 'article description'
      }]
      const mockAction = {
        type: 'NEXT_PAGE_SUCCESS',
        nextPage
      }

      expect(nextPageSuccess([], mockAction)).toEqual(nextPage)
    });
  });

  describe("nextPageLoading", () => {
    it("should return default state when no action passed", () => {
      expect(nextPageLoading(false, {})).toEqual(false)
    });

    it("should return true if next page is loading", () => {
      const mockAction = {
        type: 'NEXT_PAGE_LOADING',
        nextPageLoading: true
      }

      expect(nextPageLoading(false, mockAction)).toEqual(true)
    });
  });

  describe("nextPageErrored", () => {
    it("should return default state when no action passed", () => {
      expect(nextPageErrored(false, {})).toEqual(false)
    });

    it("should return true if next page errored", () => {
      const mockAction = {
        type: 'NEXT_PAGE_ERRORED',
        nextPageHasErrored: true
      }

      expect(nextPageErrored(false, mockAction)).toEqual(true)
    });
  });
});
