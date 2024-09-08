# CR2032 Proxy

A private **download proxy** to bypass network restrictions.

## About

This project is a **download proxy** designed to act as a bridge, allowing the download of files from sources that may be *blocked* by a network configuration. I created this proxy specifically to overcome the restrictions imposed by my school’s network, which blocks access to certain websites like **GitHub**, making it difficult to download essential files. By using this proxy, it becomes possible to bypass such limitations and retrieve the files needed from blocked sources.

## Production Deploy

Downloading dependencies
```bash
$ npm install

```

Exporting credentials and server port
```bash
$ export CR_USER_NAME="Your user name"
$ export CR_PASSWORD="Your password"
$ export PORT=8080 # some hosting platforms can setup it automatically, like Heroku and Render.
```

Run from start script
```bash
$ npm run start
```

After that, you can access the application from the address in that you have been hosted it.

## Local/Test deploy
Source test credentials script
```bash
$ source test-credentials.sh
```

> That's what will be exported:
> | Env. Variable | Value   |
> |---------------|---------|
> | CR_USER_NAME  | Test    |
> | CR_PASSWORD   | Test    |

You can also export server port

```bash
$ export PORT=8080
```

Run with nodemon
```bash
$ nodemon
```

If setuped with the same configurations of the example, you can access it from your browser at [http://localhost:8080](https://localhost:8080)
