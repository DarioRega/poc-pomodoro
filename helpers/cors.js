export const getCorsPermission = (axios) =>
  axios.get(`/sanctum/csrf-cookie`, {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
  })
