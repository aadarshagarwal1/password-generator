import {
  Alert,
  Appearance,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import BouncyCheckBox from 'react-native-bouncy-checkbox';

const returnColor = () => {
  if (Appearance.getColorScheme() === 'dark') return 'white';
  else return 'black';
};

const generateRandomSubstring = (poolString: string, length: number) => {
  let substring = '';
  for (let i = 0; i < length; i += 1) {
    const index = Math.floor(Math.random() * (poolString.length - +1));
    substring += poolString.charAt(index);
  }
  return substring;
};

export default function App() {
  const generatePassword = () => {
    let poolString = '';
    if (!lowercase && !uppercase && !numbers && !specialCharacters) {
      poolString = 'abcdefghijklmnopqrstuvwxyz';
    } else {
      const lowercasePoolString = lowercase ? 'abcdefghijklmnopqrstuvwxyz' : '';
      const uppercasePoolString = uppercase ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '';
      const numbersPoolString = numbers ? '0123456789' : '';
      const specialCharactersPoolString = specialCharacters
        ? '!"#$%&\'()*+-/::;<=>?@[\\]^_{|}~'
        : '';
      poolString =
        lowercasePoolString +
        uppercasePoolString +
        numbersPoolString +
        specialCharactersPoolString;
    }
    let passwordLength = 8;
    if (!length.length) {
      setLength('8');
    } else {
      passwordLength = Number(length);
    }
    const password = generateRandomSubstring(
      poolString,
      Number(passwordLength),
    );
    return password;
  };

  const updatePassword = (newPassword: string) => {
    setPassword(newPassword);
  };

  const HandleLongPress = () => {
    Clipboard.setString(password);
  };
  const [password, setPassword] = useState('');
  const [length, setLength] = useState('');
  const [lowercase, setLowercase] = useState(true);
  const [uppercase, setUppercase] = useState(true);
  const [numbers, setnumbers] = useState(false);
  const [specialCharacters, setSpecialCharacters] = useState(false);

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView>
        <Text style={[styles.headingText, {color: returnColor()}]}>
          Password Generator
        </Text>
        <View>
          <View style={styles.inputField}>
            <Text style={[{color: returnColor(), fontSize: 20}]}>
              Password Length
            </Text>
            <TextInput
              placeholder="Eg. 8"
              value={length}
              onChange={e => setLength(e.nativeEvent.text)}
              keyboardType="numeric"
              onSubmitEditing={() => {
                updatePassword(generatePassword());
              }}
              style={styles.passwordLengthInputBox}></TextInput>
          </View>
          <View style={styles.inputField}>
            <Text style={[{color: returnColor(), fontSize: 20}]}>
              Include Lowercase Letters
            </Text>
            <BouncyCheckBox
              isChecked={lowercase}
              onPress={() => setLowercase(val => !val)}
              fillColor="grey"
              disableText={true}
            />
          </View>
          <View style={styles.inputField}>
            <Text style={[{color: returnColor(), fontSize: 20}]}>
              Include Uppercase Letters
            </Text>
            <BouncyCheckBox
              isChecked={uppercase}
              onPress={() => setUppercase(val => !val)}
              fillColor="grey"
              disableText={true}
            />
          </View>
          <View style={styles.inputField}>
            <Text style={[{color: returnColor(), fontSize: 20}]}>
              Include Numbers
            </Text>
            <BouncyCheckBox
              isChecked={numbers}
              onPress={() => setnumbers(val => !val)}
              fillColor="grey"
              disableText={true}
            />
          </View>
          <View style={styles.inputField}>
            <Text style={[{color: returnColor(), fontSize: 20}]}>
              Include Special Characters
            </Text>
            <BouncyCheckBox
              isChecked={specialCharacters}
              onPress={() => setSpecialCharacters(val => !val)}
              fillColor="grey"
              disableText={true}
            />
          </View>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() => {
              updatePassword(generatePassword());
            }}>
            <View style={styles.generateButton}>
              <Text style={styles.buttonText}>GENERATE</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              updatePassword('');
              setLength('');
              setLowercase(true);
              setUppercase(true);
              setnumbers(false);
              setSpecialCharacters(false);
            }}>
            <View style={styles.resetButton}>
              <Text style={styles.buttonText}>RESET</Text>
            </View>
          </TouchableOpacity>
        </View>
        {password.length > 0 && (
          <View style={styles.passwordContainer}>
            <Text
              style={styles.passwordText}
              onLongPress={() => {
                HandleLongPress();
              }}>
              {password}
            </Text>
            <Text style={{color: returnColor()}}>Long press to copy</Text>
          </View>
        )}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  passwordText: {color: returnColor(), fontSize: 30},
  passwordContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderWidth: 1,
    marginHorizontal: 10,
    minHeight: 100,
    borderColor: returnColor(),
    borderRadius: 10,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginVertical: 20,
  },
  generateButton: {
    borderWidth: 1,
    borderColor: returnColor(),
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 150,
  },
  buttonText: {color: 'white', fontSize: 20, textAlign: 'center'},
  resetButton: {
    borderWidth: 1,
    borderColor: returnColor(),
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: 'grey',
    minWidth: 150,
  },
  headingText: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 20,
  },
  whiteText: {
    color: 'white',
  },
  blackText: {
    color: 'black',
  },
  passwordLengthInputBox: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: returnColor(),
    width: 100,
    borderRadius: 5,
    paddingHorizontal: 5,
    color: returnColor(),
  },
  inputField: {
    marginHorizontal: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
  },
});
