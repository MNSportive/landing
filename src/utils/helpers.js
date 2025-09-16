export const postToGoogleForms = async (formId, formData) => {
  const formUrl = `https://docs.google.com/forms/d/e/${formId}/formResponse`
  const body = new URLSearchParams(formData).toString()

  try {
    const res = await fetch(formUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      mode: 'no-cors',
      body,
    })

    return res
  } catch (err) {
    console.warn(err)
  }
}

export const getInventoryData = async () => {
  try {
    const res = await fetch('https://mns-server.vercel.app/api/products')
    const json = res.json()
    return json
  } catch (err) {
    console.warn(err)
  }
}

export const generateRandomString = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < 16; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}
