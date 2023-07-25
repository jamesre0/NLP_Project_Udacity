import { handleSubmit } from './js/formHandler'
import { isValidURL } from './js/urlValidator'
import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'

alert("I exist")

document.getElementById('form').addEventListener('submit', handleSubmit);

export {
    handleSubmit,
    isValidURL
}