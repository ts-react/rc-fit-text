import React from 'react';

export interface IFitTextProps {
  compressor?: number;
  minFontSize?: number;
  maxFontSize?: number;
  children: React.ReactElement;
}

const nodes = new Map();
let updateQueued = false;

class FitText extends React.Component<IFitTextProps> {
  static defaultProps = {
    compressor: 1,
    minFontSize: Number.NEGATIVE_INFINITY,
    maxFontSize: Number.POSITIVE_INFINITY
  };

  componentWillMount() {
    if (!updateQueued) {
      window.requestAnimationFrame(this.onBodyResize);
    }
    window.addEventListener('resize', this.onBodyResize);
    window.addEventListener('load', this.onBodyResize);
  }

  componentDidUpdate() {
    this.onBodyResize();
  }

  componentWillUnmount() {
    // @ts-ignore
    if (this._childRef) {
      // @ts-ignore
      nodes.delete(this._childRef);
    }
    window.removeEventListener('resize', this.onBodyResize);
    window.removeEventListener('load', this.onBodyResize);
  }

  updateElementStyle = (element, options, width) => {
    element.style.fontSize = `${Math.min(Math.max(width / (options.compressor * 10), options.minFontSize), options.maxFontSize)}px`;
  };

  onBodyResize = () => {
    updateQueued = true;
    const widths = [];
    nodes.forEach((options, element) => {
      widths.push(element.offsetWidth);
    });
    let i = 0;
    nodes.forEach((options, element) => {
      this.updateElementStyle(element, options, widths[i]);
      i += 1;
    });
  };

  _renderChildren = () => {
    const { children } = this.props;
    const _this = this;
    return React.Children.map(children, (child) => {
      return React.cloneElement(child as any, {
        ref: (c) => {
          if (c) {
            nodes.set(c, _this.props);
          }
          // @ts-ignore
          _this._childRef = c;
        }
      })
    })
  };


  render() {
    return this._renderChildren()[0];
  }
}

export default FitText;
