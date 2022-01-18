import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const NotifFail = () => {
  return (
    MySwal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    })
  )
}

export default NotifFail