import {performAction} from './js/app'
import {performDelete} from './js/deleteTrip'

import './styles/style.scss'
import img from './media/Photo.jpg'

export {
  performAction,
  performDelete

}

document.getElementById('save').addEventListener('click', performAction);
document.getElementById('delete').addEventListener('click', performDelete);
