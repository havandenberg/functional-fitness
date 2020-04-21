import React from 'react';
import infoImg from 'assets/images/info.svg';
import l from 'ui/layout';
import th from 'ui/theme';
import ty from 'ui/typography';

const Start = () => (
  <l.PageContent mx="auto">
    <l.FlexColumnCentered pb={th.spacing.md} pt={th.spacing.lg}>
      <l.Img height={th.sizes.lg} mb={th.spacing.md} src={infoImg} />
      <ty.H2>Getting Started</ty.H2>
    </l.FlexColumnCentered>
    <l.Div p={th.spacing.md}>
      <ty.Text mb={th.spacing.md} size="large">
        Class Structure:
      </ty.Text>
      <ty.Text mb={th.spacing.md}>
        This follow-along online fitness class is broken down into regularly scheduled exercise sessions led by an
        instructor on zoom.
      </ty.Text>
      <ty.Text mb={th.spacing.md}>
        Each session is <l.Primary>~30 mins</l.Primary> in length and consists of exercises of all differnet types, with
        the goal to make improvements in all areas of your personal fitness over time.
      </ty.Text>
      <ty.Text mb={th.spacing.md}>
        Sessions will vary in mental and physical intensity, and all sessions can be adjusted to fit your personal
        fitness level in real time.
      </ty.Text>
      <ty.Text mb={th.spacing.lg}>You can view the complete list of possible exercises here.</ty.Text>
      <ty.Text mb={th.spacing.md} size="large">
        Rules:
      </ty.Text>
      <ty.Text mb={th.spacing.md} size="large">
        Prerequisites:
      </ty.Text>
      <ty.Text mb={th.spacing.md} size="large">
        How To Join:
      </ty.Text>
      <ty.Text mb={th.spacing.md} size="large">
        Upcoming Features:
      </ty.Text>
    </l.Div>
  </l.PageContent>
);

export default Start;
