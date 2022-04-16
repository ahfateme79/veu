export default function auth(nav) {

    if (nav.to.name !== 'login' && localStorage.getItem('token') === null) {
        return window.location.href = '/login'

    }

    return nav.next()
}