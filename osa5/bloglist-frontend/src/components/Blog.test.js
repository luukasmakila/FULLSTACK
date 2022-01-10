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
    <ShowBlog blog={blog} handleClick={mockHandler}/>
  )

  component.debug()
  
  //testi toimii, kun ShowBlog komponentin oma handleClick kommentoidaan pois
  //ja handleClick lisätään propseihin
  const button = component.getByText('view')
  fireEvent.click(button)
  
  expect(mockHandler.mock.calls).toHaveLength(1)
})

test('click like 2x', async () => {
  const blog = {
    title: "test",
    author: "test",
    url: "testurl",
    likes: 2,
  }

  //tyhmästi olin määritellyt handleClickit komponentin sisällä, joten täytyy vähän kikkailla
  const mockHandler = jest.fn()
  const mockHandler1 = jest.fn()

  const component = render(
    <ShowBlog blog={blog} handleClick={mockHandler} handleLike={mockHandler1}/>
  )

  component.debug()
  
  //testi toimii, kun ShowBlog komponentin oma handleClick kommentoidaan pois
  //ja handleClick lisätään propseihin
  const button = component.getByText('view')
  fireEvent.click(button)
  //handleLike tulee tehdä myös mockHandleriksi ja lisätä propseihin niin testi toimii
  const button2 = component.getByText('like')
  fireEvent.click(button2)
  fireEvent.click(button2)
  
  expect(mockHandler1.mock.calls).toHaveLength(2)
})