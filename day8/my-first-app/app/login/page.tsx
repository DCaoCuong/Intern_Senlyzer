

// form login (input token)
// save token to cookie 'auth-token'

export default function Login() {
    return (
        <div>
            <h1>Login</h1>
            <form action="">
                <input type="text" name="token" placeholder="Token" />
                <button type="submit">Login</button>

            </form>
        </div>
    )
}