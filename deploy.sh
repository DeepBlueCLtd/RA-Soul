#!/bin/bash

cd client
npm install
npm run build
cp -R dist ../_extensions