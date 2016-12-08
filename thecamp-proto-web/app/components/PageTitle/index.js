/**
 *
 * PageTitle
 *
 */

import React from 'react';

import styles from './styles.pcss';

function PageTitle(props) {
  return (
    <div className={styles.pageTitle}>
      <h2>
        {props.title}
      </h2>
    </div>
  );
}

PageTitle.propTypes = {
  title: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]),
};

export default PageTitle;
