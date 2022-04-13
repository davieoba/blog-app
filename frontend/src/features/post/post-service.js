const createPost = async (postData, token) => {
  const response = await fetch(`http://localhost:8000/api/v1/posts`, {
    method: 'POST',
    body: JSON.stringify(postData),
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`
    }
  })

  const data = await response.json()
  return data
}

export const authService = {
  createPost
}
