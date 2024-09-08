checkForCredentials()

const statusSpan = document.getElementById("status")
const urlInput = document.getElementById("url-input")
const downloadButton = document.getElementById("download-button")

downloadButton.onclick = () => {
  const url = urlInput.value
  const credentials = getCredentials()

  urlInput.disabled = true
  fetch(`/proxy?url=${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(credentials)
  }).then(async (res) => {
    if (res.ok) {
      statusSpan.classList.add("active")
      await receivePipedDownload(res)
      statusSpan.classList.remove("active")
    } else {
      res.text().then(alert)
    }
  }).finally(() => {
    urlInput.disabled = false
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

async function receivePipedDownload(stream) {
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
  download(url, "download")
}

function download(url, fileName) {
  const a = document.createElement("a")
  a.href = url
  a.download = fileName
  a.click()
}
