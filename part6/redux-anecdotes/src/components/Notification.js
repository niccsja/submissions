import React from 'react'
import { useSelector } from 'react-redux';


const Notification = () => {
    

    const notification = useSelector(state => state.notification);

  const style = {
    visibility: notification === null  ? 'hidden': 'visible',
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
          you voted  {notification}

    </div>
  )
}

export default Notification