import { PropagateLoader } from 'react-spinners'

export const PageLoader = () => {
  return (
    <div
      className={
        'relative h-screen w-screen bg-gradient-to-r from-green-400 via-lime-300 to-yellow-300'
      }
    >
      <div className={'absolute top-1/2 right-1/2'}>
        <PropagateLoader color={'#ffffff'} />
      </div>
    </div>
  )
}
