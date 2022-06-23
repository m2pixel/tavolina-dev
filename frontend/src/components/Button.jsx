import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Button(props) {
  let btn = ''
  const btnStyle = props.buttonStyle ? props.buttonStyle : 1

  switch (btnStyle) {
    case 1:
      btn =
        'bg-dark text-white cursor-pointer underline underline-offset-8 decoration-primary w-fit text-white hover:text-primary py-5 px-5 text-xl rounded shadow-xl'
      break
    case 2:
      btn =
        'bg-secondary text-white text-center cursor-pointer uppercase font-semibold md:font-medium hover:opacity-75 py-5 px-5 text-xl rounded shadow-xl'
      break
    case 3:
      btn =
        'bg-tableOff text-center text-white cursor-pointer uppercase font-semibold md:font-medium hover:opacity-75 py-5 px-5 text-xl rounded shadow-xl'

      break
    case 4:
      btn =
        'bg-tableOn w-full text-center text-white cursor-pointer uppercase font-semibold md:font-medium hover:opacity-75 py-5 px-5 text-xl rounded shadow-xl'

      break
    case 5:
      btn =
        'bg-dark text-white text-center cursor-pointer underline underline-offset-8 decoration-primary w-fit text-white hover:text-primary py-3 px-5 text-xl rounded shadow-xl'
      break
    case 6:
      btn =
        'w-80 bg-tableOff text-center cursor-pointer rounded font-bold text-sm hover:opacity-80 uppercase text-white py-3 px-2 text-center'
      break
    case 7:
      btn =
        'w-80 bg-dark rounded font-bold text-sm hover:bg-opacity-80 uppercase text-center text-white py-3'
      break
    default:
      btn =
        'bg-dark w-full text-white cursor-pointer uppercase font-semibold md:font-medium hover:opacity-75 py-5 px-5 text-xl rounded shadow-xl'
  }
  // const style = !props.buttonStyle
  //   ? 'underline underline-offset-8 decoration-primary w-fit bg-dark text-white hover:text-primary py-5 px-5 text-xl rounded shadow-xl'
  //   : `py-5 px-5 text-xl rounded shadow-xl ${props.buttonStyle}`

  return (
    <>
      {props.action ? (
        <div
        className={btn}
          onClick={() => {
            return props.obj ? props.action(props.obj) : props.action()
          }}
        >
          {props.title}{' '}
          {props.icon != null && (
            <FontAwesomeIcon className="text-white pl-3" icon={props.icon} />
          )}
        </div>
      ) : (
        <button className={btn}>
          {props.title}{' '}
          {props.icon != null && (
            <FontAwesomeIcon className="text-white pl-3" icon={props.icon} />
          )}
        </button>
      )}
    </>
  )
}
