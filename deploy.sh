#!/bin/bash

cd client
npx vite
npm install
npm run build
cp -R dist ../_extensions