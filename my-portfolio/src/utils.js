/* Maps a tech/skill name to its icon path in /public/icons/ */
export const getIconPath = (name) =>
  `/icons/${name.toLowerCase().replace(/\s+/g, "").replace(/\./g, "")}.svg`;
