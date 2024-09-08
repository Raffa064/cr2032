checkForCredentials()

const statusSpan = document.getElementById("status")
const urlInput = document.getElementById("url-input")
const downloadButton = document.getElementById("download-button")

downloadButton.onclick = downloadHandler

function downloadHandler()  {
  const url = urlInput.value
  const credentials = getCredentials()

  statusSpan.classList.add("active")
  urlInput.disabled = true
  downloadButton.onclick = null

  fetch(`/proxy?url=${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(credentials)
  }).then(async (res) => {
    if (res.ok) {
      await receivePipedDownload(res, getURLFileName(url))
    } else {
      res.text().then(alert)
    }
  }).finally(() => {
    statusSpan.classList.remove("active")
    urlInput.disabled = false
    downloadButton.onclick = downloadHandler
  })
}

function getCredentials() {
  return {
    user: sessionStorage.getItem("cr-user"),
    password: sessionStorage.getItem("cr-password")
  }
}

function checkForCredentials() {
  const credentials = getCredentials()

  if (credentials.user && credentials.password)
    return

  location.href = "credentials.html"
}

async function receivePipedDownload(stream, fileName) {
  const chunks = []
  const reader = stream.body.getReader()

  finished = false
  while (!finished) {
    const { value, done } = await reader.read()

    if (done) {
      finished = true;
      break;
    }

    chunks.push(value)
  }

  const blob = new Blob(chunks)
  const url = URL.createObjectURL(blob)
  download(url, fileName)
}

function download(url, fileName) {
  const a = document.createElement("a")
  a.href = url
  a.download = fileName
  a.click()
}

function getURLFileName(url) {
  const slashIndex = url.lastIndexOf("/")

  if (slashIndex)
    return url.substring(slashIndex + 1, url.length)

  return url 
}
