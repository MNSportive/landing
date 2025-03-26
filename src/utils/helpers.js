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
