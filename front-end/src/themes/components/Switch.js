import light from "../source/light";
import cobalt from "../source/cobalt";
import marine from "../source/marine";
const themes = {
  cobalt,
  light,
  marine,
};

export default function getTheme(theme) {
  return themes[theme];
}
