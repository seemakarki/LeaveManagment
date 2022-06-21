import React from 'react'

function Create() {
    return (
        <div class="login-page">
            <div class="form">
                <form class="login-form">
                    <input type="text" placeholder="username" />
                    <input type="password" placeholder="password" />
                    <button>Create</button>
                    {/* <p class="message">Not registered? <a href="#">Create an account</a></p> */}
                </form>
            </div>
        </div>
    )
}

export default Create