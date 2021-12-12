import light from "./light";
import cobalt from "./cobalt";
import marine from "./marine";
const themes = {
  cobalt,
  light,
  marine,
};

export default function getTheme(theme) {
  return themes[theme];
}
