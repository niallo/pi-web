# pi-web

A dashboard based on pi agent SDK.

Now the dashboard release as a pi extension, after installing the extension, you
can press `/web` in the pi tui and open the `localhost:7036` in your browser to
enjoy the same experience in pi tui.

---

## Quick start

Install the published package into your Pi environment:

```bash
pi install npm:@woxqaq/pi-web
```

Start Pi, then run:

```
/web
```

Open the printed URL (default: `http://localhost:7036`) in your browser.

---

## License

MIT

## Known issues

- Safari(IOS/MacOS) has problems on websocket connection
