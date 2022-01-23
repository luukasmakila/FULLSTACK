import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.notification
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div>
      {notification.message === null 
        ? <div></div>
        : <div style={style}>{notification.message}</div>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const connectedNotifications = connect(mapStateToProps)(Notification)
export default connectedNotifications