import { registerTsProject } from 'nx/src/utils/register';
import { join } from 'path';

const cleanup = registerTsProject(
  join(__dirname, '../../../'),
  'tsconfig.base.json'
);

import { helper } from '@angular-storybook-nx/helper';

export default function () {
  return helper();
}

cleanup();
