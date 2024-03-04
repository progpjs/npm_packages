#!/bin/zsh

#### This script takes the dev version of the package (this directory)
#### and save a copy inside the embed section of the Go projects in order
#### to be embed the node modules inside the Go executable.

cp -r ./@progp/core     ../progpjs.modules/modCore/embed/jsMods/@progp
cp -r ./@progp/react    ../progpjs.modules/modReact/embed/jsMods/@progp
cp -r ./@progp/http     ../progpjs.modules/modHttp/embed/jsMods/@progp
cp -r ./@progp/nodejs   ../progpjs.modules/modNodeJs/embed/jsMods/@progp

cp -r ./@progp/jsondb   ../progpjs.jsondb/embed/jsMods/@progp

cd ../progpjs.dev/__javascript && npm run linkdev