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