const Notifications = ({ message, type = 'error' }) => {
  if (!message) {
    return null
  }

  return (
    <div className={type}>
      {message}
    </div>
  )
}

export default Notifications