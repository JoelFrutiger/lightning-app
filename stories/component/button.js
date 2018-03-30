import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Background from '../../src/component/background';
import MainContent from '../../src/component/main-content';
import { Button, PillButton, IconButton } from '../../src/component/button';
import { colors } from '../../src/component/style';

storiesOf('Button', module)
  .addDecorator(story => (
    <Background image="purple-gradient-bg">{story()}</Background>
  ))
  .add('Default', () => (
    <Button onPress={action('clicked')}>Default Button</Button>
  ))
  .add('Disabled', () => (
    <Button disabled onPress={action('clicked')}>
      Disabled Button
    </Button>
  ));

storiesOf('Button', module)
  .add('Pill', () => (
    <PillButton onPress={action('clicked')}>Pill Button</PillButton>
  ))
  .add('Pill Disabled', () => (
    <PillButton disabled onPress={action('clicked')}>
      Pill Disabled
    </PillButton>
  ))
  .add('Pill Orange', () => (
    <PillButton
      style={{ backgroundColor: colors.orange }}
      onPress={action('clicked')}
    >
      Pill Button
    </PillButton>
  ));

storiesOf('Button', module)
  .addDecorator(story => (
    <Background image="purple-gradient-bg">
      <MainContent style={{ justifyContent: 'center' }}>{story()}</MainContent>
    </Background>
  ))
  .add('Icon Button', () => (
    <IconButton image="cancel" onPress={action('clicked')} />
  ))
  .add('Icon Disabled', () => (
    <IconButton image="cancel" disabled onPress={action('clicked')} />
  ));