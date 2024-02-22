import type { Theme, ThemeVariants } from "~/utilities/types";

export default () => {
  const selectedTheme = useColorMode();
  const { tm } = useI18n();

  const getCurrentTheme = computed((): Theme => {
    const localStorageColorScheme = localStorage.getItem("vueuse-color-scheme");

    onSetCurrentThemeState(localStorageColorScheme as ThemeVariants);

    return useThemeState().value!;
  });

  const onSetCurrentThemeState = (theme: ThemeVariants) => {
    const themes = tm("other.themes") as Theme[];

    useThemeState().value = themes.find((i18nTheme: Theme) => {
      return i18nTheme.value === theme;
    })!;
  };
  const onChangeTheme = (theme: ThemeVariants) => {
    selectedTheme.value = theme;
    changeColorScheme(theme);

    onSetCurrentThemeState(theme);
  };

  return {
    // computed properties
    getCurrentTheme,
    // methods
    onChangeTheme,
  };
};
