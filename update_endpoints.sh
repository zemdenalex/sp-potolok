#!/bin/bash
find ./site/src -type f -name "*.jsx" -exec sed -i 's|http://92.63.179.227:8080|http://localhost:8080|g' {} \;