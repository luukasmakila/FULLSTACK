import { func } from "prop-types"

describe('Blog ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: "LTD",
      name: "luukas",
      password: "123"
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('log in to application')
    cy.contains('login')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
  })

  it('user can login with correct credentials', function() {
    cy.login({username: "LTD", password: "123"})
    cy.contains('logged in as')
  })

  it('user can not login with incorrect credentials', function() {
    cy.login({username: "LTD", password: "12345"})
    cy.get('html').should('not contain', 'logged in as')
  })

  describe('Blog App', function() {
    beforeEach(function() {
      cy.login({username: "LTD", password: "123"})
    })

    it('New blog can be created', function() {
      cy.createBlog({
        title: "test",
        author: "cypress",
        url: "testing.com"
      })
      cy.contains('test')
    })

    it('Blog can be liked', function() {
      cy.createBlog({
        title: "test",
        author: "cypress",
        url: "testing.com"
      })

      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('1')
    })

    it('blog can be deleted', function() {
      cy.createBlog({
        title: "test",
        author: "cypress",
        url: "testing.com"
      })
      cy.contains('view').click()
      cy.contains('delete blog').click()
      cy.get('html').should('not contain', 'test')
    })

    it('blogs are in liked order', function() {
      cy.createBlog({
        title: "test",
        author: "cypress",
        url: "testing.com",
        likes: 10
      })
      cy.createBlog({
        title: "test2",
        author: "cypress2",
        url: "testing.com2",
        likes: 4
      })
      cy.createBlog({
        title: "test3",
        author: "cypress3",
        url: "testing.com3",
        likes: 27
      })
      cy.createBlog({
        title: "test4",
        author: "cypress4",
        url: "testing.com4",
        likes: 1
      })
      cy.get('#view').click()
      cy.contains('27')
    })
  })
})