import * as React from 'react';
import { render } from '@testing-library/react';

import { FormGroup } from '../FormGroup';

describe('FormGroup.test.tsx', () => {
  it('should render children', () => {
    const { getByText } = render(<FormGroup>any children</FormGroup>);
    expect(getByText('any children')).toBeInTheDocument();
  });
});
