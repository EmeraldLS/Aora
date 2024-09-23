import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { signIn } from "../../lib/appwrite";
const Signin = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    setIsSubmitting(true);
    try {
      const result = await signIn(form.email, form.password);
      console.log(result);
      router.push("/home");
    } catch (err) {
      console.log(err);
      Alert.alert("Error", err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center min-h-[85vh] px-4 mt-5">
          <Image
            source={images.logo}
            className="w-[115px] h-[35px]"
            resizeMode="contain"
          />
          <Text className="text-2xl text-semibold font-psemibold mt-10 text-white">
            Log into Aora
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(v) => setForm({ ...form, email: v })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(v) => setForm({ ...form, password: v })}
            otherStyles="mt-7"
          />

          <Link
            href="/home"
            className="underline text-blue-400 mt-5 text-right"
          >
            Forgot Password?
          </Link>

          <CustomButton
            title="Sign in"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Dont have account?{" "}
              <Link
                href="/signup"
                className=" text-secondary font-semibold underline"
              >
                Sign Up
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signin;

const styles = StyleSheet.create({});
