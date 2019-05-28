import React from 'react';
import { StyleSheet } from 'react-native';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import Background from '../component/background';
import MainContent from '../component/main-content';
import { InputField } from '../component/field';
import { Header, Title } from '../component/header';
import { CancelButton, PillButton, Button, RadioButton } from '../component/button';
import Card from '../component/card';
import LightningBoltIcon from '../asset/icon/lightning-bolt';
import { FormStretcher, FormText, FormSubText } from '../component/form';
import { color } from '../component/style';
import { SettingList, SettingItem } from '../component/setting';

const styles = StyleSheet.create({
  description: {
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 40,
  },
  subText: {
    paddingTop: 20,
    paddingBottom: 40,
    paddingLeft: 40,
    paddingRight: 40,
  },
});

const GameView = ({ store, nav, payment, game }) => (
    <Background image="purple-gradient-bg">
      <Header shadow color={color.purple}>
        <Button disabled onPress={() => {}} />
        <Title title="Lightning Payment">
          <LightningBoltIcon height={12} width={6.1} />
        </Title>
        <CancelButton onPress={() => nav.goHome()} />
      </Header>
      <MainContent>
        <Card>
          <FormText style={styles.description}>
            Game to connect
          </FormText>
          <FormStretcher>
            <SettingList>
                <SettingItem
                    name={store.connectedGames[0].name}
                >
                  <RadioButton selected={true} />
                </SettingItem>
            </SettingList>
            <InputField
                placeholder="Username"
                autoFocus={true}
                value={store.connectedGames[0].username}
                onChangeText={username => game.setUsername({ username })}
                //onSubmitEditing={() => payment.checkType()}
            />
          </FormStretcher>
          <PillButton onPress={() => game.login()}>Connect</PillButton>
        </Card>
      </MainContent>
    </Background>
);

GameView.propTypes = {
  store: PropTypes.object.isRequired,
  nav: PropTypes.object.isRequired,
  payment: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired
};

export default observer(GameView);
