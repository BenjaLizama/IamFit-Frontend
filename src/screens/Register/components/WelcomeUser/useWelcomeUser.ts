import { WelcomeUserProps } from "./WelcomeUser.types";

export const useWelcomeUser = ({ name }: WelcomeUserProps) => {
  let formatedName: string = "usuario";

  if (name !== undefined && name !== null) {
    formatedName = name;
  }

  return {
    formatedName,
  };
};
