# Armenian-English Transliteration

## Installation

```bash
npm install armenian-transliteration
```

## Usage

```javascript
import { transliterate } from "armenian-transliteration";

const armenianText = "Հայերեն տեքստ";
const latText = transliterate(armenianText, "en");
const rusText = transliterate(armenianText, "ru");

console.log(latText); // Hayeren tekst
console.log(rusText); // Хайерен текст
```
