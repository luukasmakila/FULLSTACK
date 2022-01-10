import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import ShowBlog from './ShowBlog'

test('renders title and author', () => {
  const blog = {
    title: "test",
    author: "test"
  }

  const component = render(
    <ShowBlog blog={blog}/>
  )

  expect(component.container).toHaveTextContent(
    'test'
  )
})

test('renders rest of the blog', () => {
  const blog = {
    title: "test",
    author: "test",
    url: "testurl",
    likes: 2,
  }

  const mockHandler = jest.fn()

  const component = render(
    <ShowBlog blog={blog} toggleImportance={mockHandler}/>
  )
  
  const button = component.getByText('view')
  fireEvent.click(button)
  
  expect(component.container).toHaveTextContent(
    'testurl'
  )
})
