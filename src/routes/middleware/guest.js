export default function guest(nav) {

    if (localStorage.getItem('token') !== null) {
        return window.location.href = '/home'

    }

    return nav.next()
}