import { i18n, LocalizationKey } from "@/Localization";
import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { HStack, Spinner, Heading } from "native-base";
import { User } from "@/Services";
import { useNavigation } from "@react-navigation/native";
import { Text, Checkbox } from "react-native-paper";
import {
  TextInput,
  Button,
} from "react-native-paper";
import { RootScreens } from "..";

export interface IMainProps {
  data: User | undefined;
  isLoading: boolean;
}

export const Login = (props: IMainProps) => {
  const { data, isLoading } = props;
  const [eventDate, setEventDate] = useState(new Date());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [rememberMe, setRememberMe] = React.useState(true);
  const goSignInScreen = () => {
    navigation.navigate(RootScreens.SIGNIN);
  };

  const handleLogin = () => {
    setLoading(true);
    // Simulate a login request
    setTimeout(() => {
      setLoading(false);
      console.log("Logged in with", email, password);
      navigation.navigate(RootScreens.HOME);
    }, 2000);
  };
  return (
    <View style={styles.container}>
      {isLoading ? (
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            {i18n.t(LocalizationKey.LOADING)}
          </Heading>
        </HStack>
      ) : (
        <View style={styles.containerInner}>
          <View>
            <View style={styles.headerWrapper}>
              <Image
                style={styles.img}
                resizeMode="contain"
                source={require("../../../assets/login.png")}
              ></Image>
              <View style={styles.floatTitle}>
                <Text style={styles.title}>Wellcome Back</Text>
                <Text variant="labelMedium">
                  Đăng nhập để truy cập tài khoản của bạn
                </Text>
              </View>
            </View>

            <View>
              <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                placeholder="Nhập email của bạn"
                keyboardType="email-address"
                outlineColor="lightgray"
                // activeOutlineColor="blue"
                underlineColor="lightgray"
                mode="outlined"
              />

              <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="Nhập mật khẩu của bạn"
                secureTextEntry
                // right={<TextInput.Icon icon="eye" />}
                mode="outlined"
                outlineColor="lightgray"
                style={styles.input}
              />
            </View>
            <View style={styles.row1}>
              <View style={styles.row}>
                <Checkbox
                  status={rememberMe ? "checked" : "unchecked"}
                  onPress={() => {
                    setRememberMe(!rememberMe);
                  }}
                />
                <Text variant="labelMedium">Ghi nhớ đăng nhập</Text>
              </View>
              <Text variant="labelMedium">Quên mật khẩu?</Text>
            </View>
          </View>
          <View style={styles.loginWrapper}>
            <Button
              mode="contained"
              onPress={handleLogin}
              loading={loading}
              disabled={loading}
              style={styles.button}
            >
              Login
            </Button>
            <Button mode="text" style={styles.newmember} onPress={() => (goSignInScreen())}>Đăng kí thành viên mới?</Button>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",

    padding: 16,
    paddingTop: 60,
    backgroundColor: "#f6f6f6",
  },
  containerInner: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",

    padding: 16,
    paddingTop: 20,
    backgroundColor: "#f6f6f6",
  },
  row1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
  },
  card: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    marginBottom: 12,
    borderRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: "white",
  },
  button: {
    marginTop: 12,
    width: 370,
    
  },
  img: {
    paddingTop: 20,
  },
  headerWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  floatTitle: {
    position: "absolute",
    top: 150,
  },
  loginWrapper: {
    position: "absolute",
    bottom: -300,
    alignItems: "center",
    justifyContent: "space-between"
  },
  newmember:{
    paddingTop: 10,
  }
});
