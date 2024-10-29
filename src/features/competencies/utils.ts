export function getEmojiForType(type: "CC" | "FC" | "TC") {
  let emoji;
  switch (type) {
    case "CC":
      emoji = "📕";
      break;
    case "FC":
      emoji = "📘";
      break;
    case "TC":
      emoji = "📗";
      break;
  }
  return emoji;
}