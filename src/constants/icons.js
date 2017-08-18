import { storage } from '../firebaseApp'

// image files from firebase storage
const arrowLeftOff = storage.ref('icons/ico_arr_left_off.png')
const arrowLeftOn = storage.ref('icons/ico_arr_left_on.png')
const arrowRightOff = storage.ref('icons/ico_arr_right_off.png')
const arrowRightOn = storage.ref('icons/ico_arr_right_on.png')
const ranking = storage.ref('icons/ico_diamond.png')
const edit = storage.ref('icons/ico_edit.png')
const addCard = storage.ref('icons/ico_plus.png')
const profile = storage.ref('icons/ico_profile.png')
const gallery = storage.ref('icons/ico_star.png')
const submit = storage.ref('icons/ico_submit.png')
const trash = storage.ref('icons/ico_trash.png')
const view = storage.ref('icons/ico_view.png')
const logo = storage.ref('icons/img_logo.png')
const mainBackground = storage.ref('icons/img_person.png')
const logoText = storage.ref('icons/txt_facescore.png')
const howManyStars = storage.ref('icons/ico_rate.png')

export const icons = [
                        arrowLeftOff, 
                        arrowLeftOn, 
                        arrowRightOff,
                        arrowRightOn, 
                        ranking, 
                        edit, 
                        addCard,
                        profile, 
                        gallery, 
                        submit, 
                        trash, 
                        view,
                        logo, 
                        mainBackground, 
                        logoText, 
                        howManyStars
                    ]
export const iconNames = ['arrowLeftOff', 'arrowLeftOn', 'arrowRightOff',
                            'arrowRightOn', 'ranking', 'edit', 'addCard',
                            'profile', 'gallery', 'submit', 'trash', 'view',
                            'logo', 'mainBackground', 'logoText', 'howManyStars']