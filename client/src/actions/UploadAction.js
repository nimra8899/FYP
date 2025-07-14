import * as UploadApi from '../api/UploadRequest'

export const uploadImage = (data) => async (dispatch) => {
    dispatch({ type: 'UPLOAD_IMAGE_START' })
    try {
        const response = await UploadApi.uploadImage(data)
        dispatch({ 
            type: 'UPLOAD_IMAGE_SUCCESS', 
            payload: response.data 
        })
        return response.data // Optional: return data for component-level handling
    } catch (error) {
        console.log(error)
        dispatch({ 
            type: 'UPLOAD_IMAGE_FAIL',
            payload: error.response?.data?.message || error.message 
        })
        throw error // Re-throw for component error handling if needed
    }
}

export const uploadPost = (data) => async (dispatch) => {
    dispatch({ type: 'UPLOAD_START' })
    try {
        const newPost = await UploadApi.uploadPost(data)
        dispatch({ type: 'UPLOAD_SUCCESS', data: newPost.data })
    } catch (error) {
        console.log(error)
        dispatch({ type: 'UPLOAD_FAIL' })
    }
}