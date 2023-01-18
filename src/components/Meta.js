import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Welcome to Plant the Seeds',
  description: 'Let us grow your vegetables and fruits',
  keywords: 'farm, seeds, plant seed, vegetable, fruit, farming',
};

export default Meta;
