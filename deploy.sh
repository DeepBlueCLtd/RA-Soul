#!/bin/bash

cd client
npm install
npx vite build
cp -R dist ../_extensions