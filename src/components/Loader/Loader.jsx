import { RotatingLines } from 'react-loader-spinner'
import css from './Loader.module.css'

export default function Loader({ isLoading }) {
  return (
    <RotatingLines
      visible={isLoading}
      height="32"
      width="32"
      strokeColor="#c5cad1"
      wrapperClass={css.loader}
      ariaLabel="rotating-lines-loading"
    />
  )
}