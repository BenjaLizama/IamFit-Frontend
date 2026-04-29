import CustomText from "@/src/core/components/CustomText";
import Wrapper from "@/src/core/components/Wrapper";
import React from "react";

export default function LoginScreen() {
  return (
    <Wrapper>
      <CustomText type="body">body</CustomText>
      <CustomText type="body_secondary">body_secondary</CustomText>
      <CustomText type="body_interactive">body_interactive</CustomText>
      <CustomText type="h1">h1</CustomText>
      <CustomText type="h2">h2</CustomText>
    </Wrapper>
  );
}
