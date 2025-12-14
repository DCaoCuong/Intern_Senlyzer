'use client'

import { useNavigationBlocker } from '../contexts/navigation-blocker'

export default function Form() {
    const { setIsBlocked } = useNavigationBlocker()

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                setIsBlocked(false)
            }}
            onChange={() => setIsBlocked(true)}
        >
            <input type="text" name="name" />
            <button type="submit">Save</button>
        </form>
    )
}