# Feedback-Paare Generator

## Erste Schritte:

- Starte die App im Dev-Mode:

```bash
npm run dev
```

## Deployment

Jeder Push auf `main` startet `.github/workflows/deploy.yml`: GitHub baut das Docker-Image
(statischer Next.js-Export, ausgeliefert von Caddy) und pusht es nach
`ghcr.io/linkandreas/feedback-partner-client`, getaggt mit dem Commit-SHA. Der Hostinger-VPS erhält
nur `compose.yaml` in `~/feedback-partner-client`, zieht das Image und startet den Container neu.

Der Container veröffentlicht keine Ports, sondern hängt im Docker-Netzwerk `web`. Der
`cloudflared`-Container erreicht ihn dort unter `http://feedback-partner-client:32774` und stellt
ihn per Cloudflare Tunnel mit HTTPS unter der Domain bereit.

Benötigte Repository-Secrets: `HOSTINGER_HOST`, `HOSTINGER_USERNAME`, `HOSTINGER_SSH_KEY`.

Rollback auf dem VPS: `cd ~/feedback-partner-client && TAG=<älterer Commit-SHA> docker compose up -d`

Lokal testen:
`docker build -t feedback-partner-client . && docker run --rm -p 32774:32774 feedback-partner-client`
→ <http://localhost:32774>
