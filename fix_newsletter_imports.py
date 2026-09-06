import re

with open("src/components/NewsletterHub.tsx", "r") as f:
    content = f.read()

content = content.replace("import React from 'react';", "import React, { useState } from 'react';")

with open("src/components/NewsletterHub.tsx", "w") as f:
    f.write(content)
