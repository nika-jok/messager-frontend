import LoadingComponent from '../../../utils/LoadingComponent'

const Loading = (): JSX.Element => {
  return (
    <div className="page-container">
      <div
        style={{
          height: '100vh',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <LoadingComponent />
      </div>
    </div>
  )
}

export default Loading
