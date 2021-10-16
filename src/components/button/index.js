import { Button } from 'reactstrap'

const MyButton = ({ children, type, color, className, size, onClick }) => {
  return (
    <Button size={size} type={type} color={color} className={className} onClick={onClick}>
      {children}
    </Button>
  )
}

export default MyButton