#!/bin/bash
set -o pipefail && cd ios && bundle install && \
gem install fastlane --no-rdoc --no-ri --no-document && \
bundle exec pod install && \
cd ../node_modules/react-native/third-party/glog-0.3.5 && \
./../../scripts/ios-configure-glog.sh && \
cd ../../../../ios && \
bundle exec fastlane test
