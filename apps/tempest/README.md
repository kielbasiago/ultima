## Static build steps

0. Install pnpm (see balance-and-ruin README)
1. Git clone the repo
2. cd apps/tempest
3. pnpm build
4. cd out/
5. python -m http.server
6. Open browser to http://localhost:8000