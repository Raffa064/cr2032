const userName = document.getElementById("user-name")
const userPassword = document.getElementById("user-password")
const submitCredentials = document.getElementById("submit-credentials")

userName.value = sessionStorage.getItem("cr-user") || ""
userPassword.value = sessionStorage.getItem("cr-password") || ""

submitCredentials.onclick = () => {
  sessionStorage.setItem("cr-user", userName.value)
  sessionStorage.setItem("cr-password", userPassword.value)

  location.href = "index.html"
}

