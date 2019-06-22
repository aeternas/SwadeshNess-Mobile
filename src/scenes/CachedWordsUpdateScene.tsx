// Ivan Golikov

import React, {Component} from 'react';

interface Props {
  navigator: any;
}


interface State { }

class CachedWordsUpdateScene extends React.Component<Props, State> {
  service: CachedWordsUpdateService;

  constructor(props: Props) {
    super(props);
    this.state = { };
    this.service = new TranslationService();
  }
  
  render() {
    return (
      <View />
    );
  }
}

export {CachedWordsUpdateScene};
