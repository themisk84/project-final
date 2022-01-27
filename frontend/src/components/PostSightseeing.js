import React from 'react'

const PostSightseeing = () => {
    return (
        <form>
            <label>Name</label>
            <input
                type="text"
                required="true"
            />
            <label>Description</label>
            <input
                type="text"
                required="true"
                minLength={5}
                maxLength={800}
            />
            <label>location</label>
            <input
                type="text"
                required
            />
            <label>Country</label>
            <input
                type="text"
                required
            />
            <label>Link</label>
            <input
                type="url"
                required
            />
            <label>Category</label>
            <input
                type="text"
                required
            />
            <label>Rating</label>
            <input
                type="number"
                required
            />
            <label>Image</label>
            <input
                type="file"
                required
            />


        </form>
    )
}

export default PostSightseeing
