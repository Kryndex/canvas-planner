import React, { Component } from 'react';
import themeable from 'instructure-ui/lib/themeable';
import containerQuery from 'instructure-ui/lib/util/containerQuery';
import CheckboxFacade from 'instructure-ui/lib/components/Checkbox/CheckboxFacade';
import Pill from 'instructure-ui/lib/components/Pill';
import { func, number, string, arrayOf, shape } from 'prop-types';

import styles from './styles.css';
import theme from './theme.js';

import formatMessage from '../../format-message';

class CompletedItemsFacade extends Component {

  static propTypes = {
    onClick: func.isRequired,
    itemCount: number.isRequired,
    badges: arrayOf(shape({
      text: string,
      variant: string
    }))
  }

  static defaultProps = {
    badges: []
  }

  renderBadges () {
    if (this.props.badges.length) {
      return (
        <ul className={styles.badgeContainer}>
          {
            this.props.badges.map((b) => (
              <li key={b.text}>
                <Pill
                  text={b.text}
                  variant={b.variant} />
              </li>
            ))
          }
        </ul>
      );
    }
    return null;
  }

  render () {
    return (
      <div className={styles.root}>
        <div className={styles.contentPrimary}>
          <button
            type="button"
            className={styles.button}
            onClick={this.props.onClick}
          >
            <span className={styles.buttonCheckbox} aria-hidden="true">
              <CheckboxFacade checked={true}>{''}</CheckboxFacade>
            </span>
            <span>
              {
                formatMessage(`{
                  count, plural,
                  one {Show # completed item}
                  other {Show # completed items}
                }`, { count: this.props.itemCount })
              }
            </span>
          </button>
        </div>
        <div className={styles.contentSecondary}>
          {this.renderBadges()}
        </div>
      </div>
    );
  }
}

export default themeable(theme, styles)(
  // we can update this to be whatever works for this component and its content
  containerQuery({
    'media-x-large': { minWidth: '68rem' },
    'media-large': { minWidth: '58rem' },
    'media-medium': { minWidth: '34rem' }
  })(CompletedItemsFacade)
);
