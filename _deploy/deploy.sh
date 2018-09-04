#!/bin/bash
set -e

#if [ $TRAVIS_BRANCH == 'production' ]; then
#    export JEKYLL_ENV=production
#    export DEPLOY_PATH=www
#else
#    export JEKYLL_ENV=development
#    export DEPLOY_PATH=test
#fi
export JEKYLL_ENV=development
export DEPLOY_PATH=test


#mv _assets/node_modules/cookieconsent/build/cookieconsent.min.css _assets/node_modules/cookieconsent/build/cookieconsent.min.scss

bundle exec jekyll build

lftp -e "mirror -R -e _site $DEPLOY_PATH; quit" -u $DEPLOY_USER,$DEPLOY_PASS sftp://$DEPLOY_HOST