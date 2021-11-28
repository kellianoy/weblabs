import light from "./light";
import cobalt from "./cobalt";

const themes = {
  light,
  cobalt,
};

export default function getTheme(theme) {
  return themes[theme];
}
