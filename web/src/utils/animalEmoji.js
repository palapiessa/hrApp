const Emojis = {
  owl: '🦉',
  dog: '🐶',
  cat: '🐱',
  snake: '🐍',
  rabbit: '🐇',
  eagle: '🦅',
  swan: '🦢',
  wolf: '🐺',
  dolphin: '🐬',
  horse: '🐎',
  crab: '🦀',
  fox: '🦊',
  hedgehog: '🦔',
  horse: '🐎',
  fish: '🐠',
  chicken: '🐥',
};

// This function takes an animal name (like "Owl") and returns its emoji
export function getAnimalEmoji(animal) {
  if (!animal) return '❓'; // if there's no animal name
  const key = animal.trim().toLowerCase(); // normalize text
  return Emojis[key] || '❓'; // return emoji or default if not found
}
