export default function JsonToDict(jsonObject) {
  const keys = Object.keys(jsonObject);
  let i = 0;
  let key = null;
  const dict = {};
  for (i = 0; i < keys.length; i++) {
    key = keys[i];
    dict.key = jsonObject[key];
  }
  return dict;
}
