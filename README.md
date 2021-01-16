# elkulo.github.io

## Public Site

https://elkulo.github.io/

### Build and Deploy

~~~
cd app
npm run build
npm run deploy
~~~

.env.production が必要

### Github Clone

~~~
git clone https://github.com/elkulo/elkulo.github.io.git elkulo.github.io
cd elkulo.github.io/app
cd npm install
~~~

env.development.txt を .env.development にリネーム

### Github First Install

~~~
git init
git add README.md 
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/elkulo/elkulo.github.io.git
git push -u origin main
git remote set-head origin main
git add --all
git commit -m "Gatsby.js"
~~~
