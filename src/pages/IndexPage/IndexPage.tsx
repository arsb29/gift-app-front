import type { FC } from 'react';
import { Page } from '@/components/Page.tsx';

export const IndexPage: FC = () => {
  return (
    <Page back={false}>
      <div>Index Page</div>
    </Page>
  );
};
