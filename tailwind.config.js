[build]
builder = "DOCKERFILE"
dockerfilePath = "Dockerfile"

[deploy]
startCommand = "node dist/boot.js"
healthcheckPath = "/api/trpc/ping"
healthcheckTimeout = 100
restartPolicyType = "on_failure"
