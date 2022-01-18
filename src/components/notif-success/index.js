import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const NotifSuccess = (subject, status) => {
  return (
    MySwal.fire({
      position: 'top-end',
      icon: 'success',
      title: `${subject} has been ${status}`,
      showConfirmButton: false,
      timer: 1500
    })
  )
}

export default NotifSuccess