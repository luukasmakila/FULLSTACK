import React from 'react'

const User = ({ user, blogs }) => {
  const usersBlogs = blogs.filter(blog => blog.user.id === user.id)

  return (
    <div>
      <p>User's name / number of blogs created</p>
      <p>{user.name} {usersBlogs.length}</p>
    </div>
  )
}

export default User
