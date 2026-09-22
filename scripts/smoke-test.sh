#!/usr/bin/env bash
set -e

PORT="${PORT:-3000}"
HOST="http://localhost:$PORT"

echo "=========================================="
echo "  ICA & Institute Portal — Smoke Test"
echo "  Target: $HOST (Port: $PORT)"
echo "=========================================="

echo "Waiting for server to be ready on $HOST..."
for i in {1..30}; do
  if curl -s -o /dev/null "$HOST/api/health"; then
    echo "Server is up!"
    break
  fi
  if [ $i -eq 30 ]; then
    echo "ERROR: Server failed to start on $HOST within 30 seconds."
    exit 1
  fi
  sleep 1
done

check_endpoint() {
  local path="$1"
  local expected_status="${2:-200}"
  local url="$HOST$path"
  
  echo -n "Checking $path ... "
  status=$(curl -s -o /dev/null -w "%{http_code}" "$url")
  
  if [ "$status" -eq "$expected_status" ]; then
    echo "[$status] OK"
    return 0
  else
    echo "[$status] FAILED (Expected $expected_status)"
    return 1
  fi
}

# 1. Health check
check_endpoint "/api/health" 200

# 2. Build info check
check_endpoint "/api/build-info" 200

# 3. Readiness check
check_endpoint "/api/ready" 200

# 4. Main landing pages
check_endpoint "/" 200
check_endpoint "/en/institute" 200
check_endpoint "/en/summit" 200

# 5. Localized institute routes
check_endpoint "/ar/institute" 200
check_endpoint "/ck/institute" 200
check_endpoint "/zh/institute" 200

# 6. Summit sub-routes
check_endpoint "/en/summit/agenda" 200
check_endpoint "/en/summit/expo" 200
check_endpoint "/en/summit/services" 200

echo "=========================================="
echo "✅ All smoke tests passed successfully!"
echo "=========================================="
exit 0
