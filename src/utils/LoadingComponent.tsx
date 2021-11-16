import DotLoader from 'react-spinners/DotLoader'

const Loading = (): JSX.Element => {
  return (
    <DotLoader size="20" radius={25} margin={2} color={'#50BCFF'} loading />
  )
}

export default Loading
