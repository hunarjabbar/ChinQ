#!/bin/bash
awk '
/^\/\/ ----- PARTNERS API -----$/ {
    skip=1
}
/app\.get\("\/api\/admin\/applications", authMiddleware/ {
    skip=0
}
{
    if (!skip) {
        print $0
    }
}
' server.app.ts > temp.ts && mv temp.ts server.app.ts
