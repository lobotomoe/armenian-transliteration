# Profiles

Profiles document the intent and source authority behind each transliteration
standard implemented by the package.

The standard objects under `src/standards` are executable mapping rules. The
profile metadata exposed from `armenian-transliteration/profiles` describes
where those rules come from, whether an ID is canonical or an alias, and what
language/script/domain the profile targets.

Use language-first IDs when the target orthography is language-specific. For
example, `ru-geo-kt-1974` is preferable to `cyr-geo-kt-1974`: Russian,
Ukrainian, and Belarusian are all Cyrillic, but their Armenian-name transfer
rules are not the same.

```ts
import { profiles, getProfile } from "armenian-transliteration/profiles";

profiles["ru-geo-kt-1974"].targetLanguage; // "ru"
getProfile("ru-proper-vartapetyan-1961").domain; // "proper-names"
```
