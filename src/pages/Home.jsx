import React from 'react'
import { Link } from 'react-router-dom'


export default function Home() {
    return (
        <div>
            <h1>Welcome to the Todo App</h1>
            <p>
                <Link to="/login">Logout</Link>
            </p>
            <p>
                <Link to="/todos">Create a Note</Link> to manage todos.
            </p>
        </div>
    )
}