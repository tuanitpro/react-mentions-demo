export function fetchUsers(query, callback) {
    if (!query) return
    fetch(`http://localhost:8090/api/v1/users/?query=${query}`, {
            json: true
        })
        .then(res => res.json())

        // Transform the users to what react-mentions expects
        .then(res =>
            res.map(user => ({
                display: user.Nickname,
                id: user.Nickname
            }))
        )
        .then(callback)
}