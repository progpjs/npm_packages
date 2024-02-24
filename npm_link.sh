#!/bin/zsh

#### Use npm link function which allows to use this dev version as-is if was the official one.
#### To install this package inside my project : npm link @progp/core @progp/http @progp/react @progp/nodejs @progp/jsondb

#### !!! This script must be executed again if files are renamed / added / removed !!!

cd ./@progp/core && npm link
cd ../..

cd ./@progp/http && npm link
cd ../..

cd ./@progp/jsondb && npm link
cd ../..

cd ./@progp/nodejs && npm link
cd ../..

cd ./@progp/react && npm link
cd ../..