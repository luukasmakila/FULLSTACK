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
  })
})