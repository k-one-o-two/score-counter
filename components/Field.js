import { View, Text, Button, TouchableOpacity, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { FieldStyles, CupImage, ServingCorner, Score } from './styles';

export const Field = () => {
  const [theirScore, setTheirScore] = useState(0);
  const [ourScore, setOurScore] = useState(0);

  const [isOurServing, setOurServing] = useState(true);
  const [isleftServing, setLeftServing] = useState(true);

  const [weWon, setWeWon] = useState(false);
  const [theyWon, setTheyWon] = useState(false);

  const [isEqual, setIsEqual] = useState(false);

  const onOurScorePress = () => {
    if (weWon || theyWon) {
      return;
    }

    setOurScore((prevCount) => {
      const newCount = prevCount + 1;
      if (newCount % 2 === 0) {
        setLeftServing(true);
      } else {
        setLeftServing(false);
      }
      return newCount;
    });
    setOurServing(true);
  };

  const onTheirScorePress = () => {
    if (weWon || theyWon) {
      return;
    }

    setTheirScore((prevCount) => {
      const newCount = prevCount + 1;
      if (newCount % 2 === 0) {
        setLeftServing(true);
      } else {
        setLeftServing(false);
      }
      return newCount;
    });
    setOurServing(false);
  };

  useEffect(() => {
    // Гейм выигрывает сторона, первой набравшая 21 очко.
    // При счете «20-20» сторона, которая первая набирает разницу в 2 очка, выигрывает гейм.
    // При счёте «29-29» сторона, выигравшая 30-е очко, выигрывает гейм.
    if (ourScore === 20 && theirScore === 20) {
      setIsEqual(true);
    }

    if (ourScore === 30) {
      setWeWon(true);
      return;
    }

    if (theirScore === 30) {
      setTheyWon(true);
      return;
    }

    if (!isEqual) {
      if (ourScore === 21) {
        setWeWon(true);
      }
      if (theirScore === 21) {
        setTheyWon(true);
      }
    } else {
      if (ourScore - theirScore >= 2) {
        setWeWon(true);
      } else if (theirScore - ourScore >= 2) {
        setTheyWon(true);
      }
    }
  }, [ourScore, theirScore, isEqual]);

  return (
    <>
      <View style={{ paddingTop: 20 }}>
        <View style={FieldStyles}>
          {theyWon ? (
            <View style={{ position: 'absolute', top: 50, zIndex: 100500 }}>
              <Image
                style={{ width: 150, height: 150 }}
                source={CupImage}
              ></Image>
            </View>
          ) : null}
          <TouchableOpacity onPress={onTheirScorePress}>
            <Text
              style={{
                ...Score,
                color: weWon || theyWon ? 'white' : 'black',
              }}
            >
              {theirScore.toString().padStart(2, '0')}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: 'white',
              width: 300,
              height: 10,
            }}
          ></View>
          <TouchableOpacity onPress={onOurScorePress}>
            <View>
              <Text
                style={{
                  ...Score,
                  color: weWon || theyWon ? 'white' : 'black',
                }}
              >
                {ourScore.toString().padStart(2, '0')}
              </Text>
            </View>
          </TouchableOpacity>
          {weWon ? (
            <View style={{ position: 'absolute', bottom: 50, zIndex: 100500 }}>
              <Image
                style={{ width: 150, height: 150 }}
                source={CupImage}
              ></Image>
            </View>
          ) : null}
          {/* our left serving */}
          {isOurServing && isleftServing && !(weWon || theyWon) ? (
            <View
              style={{
                ...ServingCorner,
                bottom: -50,
                left: -50,
              }}
            ></View>
          ) : null}
          {/* our right serving */}
          {isOurServing && !isleftServing && !(weWon || theyWon) ? (
            <View
              style={{
                ...ServingCorner,
                bottom: -50,
                right: -50,
              }}
            ></View>
          ) : null}
          {/* their left serving */}
          {!isOurServing && isleftServing && !(weWon || theyWon) ? (
            <View
              style={{
                ...ServingCorner,
                top: -50,
                left: -50,
              }}
            ></View>
          ) : null}
          {/* their right serving */}
          {!isOurServing && !isleftServing && !(weWon || theyWon) ? (
            <View
              style={{
                ...ServingCorner,
                top: -50,
                right: -50,
              }}
            ></View>
          ) : null}
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Button
          onPress={() => {
            setOurScore(0);
            setTheirScore(0);
            setOurServing(true);
            setLeftServing(true);
            setWeWon(false);
            setTheyWon(false);
            setIsEqual(false);
          }}
          title="start over"
          accessibilityLabel="start over"
        />
        <Button
          disabled={ourScore > 0 || theirScore > 0}
          onPress={() => {
            setOurServing((prev) => !prev);
          }}
          title="change serving"
          accessibilityLabel="start over"
        />
      </View>
    </>
  );
};
