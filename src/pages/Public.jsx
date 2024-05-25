import { useParams } from 'react-router'

const Public = () => {
  const { id } = useParams();
  return (
    <div>{`Public - ${id}`}</div>
  )
}

export default Public