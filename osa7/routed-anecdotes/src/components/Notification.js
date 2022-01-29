import React from 'react'

const Notification = ({ notification }) => {
  console.log(notification)
  if(notification === ''){
    return <div></div>
  }
  return (
    <div>
      {notification}
    </div>
  )
}

export default Notification
