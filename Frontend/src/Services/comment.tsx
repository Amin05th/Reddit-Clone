import useFetch from "../Hooks/useFetch";

export function createComment(postId: string, message: string, parentId:(string | null) ) {
    return useFetch(`/posts/${postId}/comments`, {
        method: 'POST',
        data: {
            message: message,
            parentId: parentId
        }
    })
}

export function updateComment(postId: string, message: string, commentid: string) {
    return useFetch(`/posts/${postId}/comments/${commentid}`, {
        method: 'PUT',
        data: {
            message: message
        }
    })
}

export function deleteComment(postId: string, commentid: string) {
    return useFetch(`/posts/${postId}/comments/${commentid}`, {
        method: 'DELETE',
    })
}