/**
 * Pronunciation analysis and phonetic comparison for German language learning
 */

export interface WordComparison {
  targetWord: string;
  spokenWord?: string;
  status: 'matched' | 'close' | 'missed';
  score: number; // 0 - 100
}

export interface PronunciationResult {
  accuracy: number; // 0 - 100
  rating: 'perfect' | 'great' | 'good' | 'retry';
  ratingLabel: string;
  feedbackTip: string;
  wordComparisons: WordComparison[];
  recognizedTranscript: string;
}

// Clean and normalize text for linguistic comparison
export function cleanGermanText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'„“«»]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Normalize umlauts and eszett for flexible phonetics comparison
function normalizeGermanPhonetics(str: string): string {
  return str
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss');
}

// Compute Levenshtein distance between two strings
function levenshteinDistance(a: string, b: string): number {
  const an = a ? a.length : 0;
  const bn = b ? b.length : 0;
  if (an === 0) return bn;
  if (bn === 0) return an;

  const matrix = Array.from({ length: bn + 1 }, () => new Array(an + 1).fill(0));

  for (let i = 0; i <= an; i++) matrix[0][i] = i;
  for (let j = 0; j <= bn; j++) matrix[j][0] = j;

  for (let j = 1; j <= bn; j++) {
    for (let i = 1; i <= an; i++) {
      if (b[j - 1] === a[i - 1]) {
        matrix[j][i] = matrix[j - 1][i - 1];
      } else {
        matrix[j][i] = Math.min(
          matrix[j - 1][i - 1] + 1, // substitution
          matrix[j][i - 1] + 1,     // insertion
          matrix[j - 1][i] + 1      // deletion
        );
      }
    }
  }

  return matrix[bn][an];
}

// Get specific German pronunciation tips for a phrase
export function getGermanPhoneticTip(text: string): string {
  const lower = text.toLowerCase();

  if (lower.includes('ch')) {
    if (lower.match(/[aou]ch/)) {
      return 'Notice the guttural "ach-Laut" sound in the back of the throat after a, o, or u.';
    }
    return 'Tip: The soft "ich-Laut" sound in "ich" is made with the tongue near the roof of your mouth, like a cat hissing.';
  }

  if (lower.includes('ä') || lower.includes('ö') || lower.includes('ü')) {
    return 'Tip: For umlauts (ä, ö, ü), round your lips firmly like making an "o" or "u", but say "eh" or "ee".';
  }

  if (lower.includes('w')) {
    return 'Tip: In German, the letter "W" is pronounced like an English "V" (e.g., "Wasser" = "Vasser").';
  }

  if (lower.includes('v')) {
    return 'Tip: In German, the letter "V" is often pronounced like an English "F" (e.g., "Vater" = "Fater").';
  }

  if (lower.includes('z')) {
    return 'Tip: The German "Z" is always pronounced like "ts" (e.g., "Zeit" sounds like "ts-eye-t").';
  }

  if (lower.includes('ß') || lower.includes('ss')) {
    return 'Tip: "ß" (Eszett) produces a sharp, unvoiced "ss" sound.';
  }

  if (lower.includes('ei')) {
    return 'Tip: "ei" is pronounced like the English word "eye" (e.g., "nein", "mein").';
  }

  if (lower.includes('ie')) {
    return 'Tip: "ie" produces a long, clear "ee" sound (e.g., "sie", "wie").';
  }

  if (lower.match(/\b(st|sp)/)) {
    return 'Tip: "st" and "sp" at the start of words are pronounced like "sht" and "shp" (e.g., "sprechen", "Stadt").';
  }

  return 'Speak clearly at a steady rhythm. German vowels are crisp and consonants are articulated crisply.';
}

/**
 * Compare target German phrase against spoken recognition transcript
 */
export function compareGermanPronunciation(
  targetPhrase: string,
  spokenTranscript: string
): PronunciationResult {
  const cleanTarget = cleanGermanText(targetPhrase);
  const cleanSpoken = cleanGermanText(spokenTranscript);

  const targetWords = cleanTarget.split(' ').filter(Boolean);
  const spokenWords = cleanSpoken.split(' ').filter(Boolean);

  if (targetWords.length === 0) {
    return {
      accuracy: 0,
      rating: 'retry',
      ratingLabel: 'No Phrase',
      feedbackTip: 'Select a German phrase to practice.',
      wordComparisons: [],
      recognizedTranscript: spokenTranscript
    };
  }

  if (spokenWords.length === 0) {
    return {
      accuracy: 0,
      rating: 'retry',
      ratingLabel: 'No Speech Detected',
      feedbackTip: 'Make sure your microphone is enabled and speak clearly into your mic.',
      wordComparisons: targetWords.map(w => ({
        targetWord: w,
        status: 'missed',
        score: 0
      })),
      recognizedTranscript: ''
    };
  }

  // Align words and compute similarity
  const usedSpokenIndices = new Set<number>();
  const wordComparisons: WordComparison[] = [];
  let totalScore = 0;

  for (let i = 0; i < targetWords.length; i++) {
    const tWord = targetWords[i];
    const tNorm = normalizeGermanPhonetics(tWord);

    // Look for best matching spoken word in a sliding window around current index
    let bestMatchIdx = -1;
    let bestSimilarity = 0;

    for (let j = 0; j < spokenWords.length; j++) {
      if (usedSpokenIndices.has(j)) continue;

      const sWord = spokenWords[j];
      const sNorm = normalizeGermanPhonetics(sWord);

      // Exact match
      if (tWord === sWord || tNorm === sNorm) {
        bestSimilarity = 1.0;
        bestMatchIdx = j;
        break;
      }

      // Distance check
      const dist = Math.min(
        levenshteinDistance(tWord, sWord),
        levenshteinDistance(tNorm, sNorm)
      );
      const maxLen = Math.max(tWord.length, sWord.length);
      const sim = Math.max(0, 1 - dist / maxLen);

      // Give slight preference to words closer to index i
      const positionPenalty = Math.abs(i - j) * 0.05;
      const effectiveSim = sim - positionPenalty;

      if (effectiveSim > bestSimilarity) {
        bestSimilarity = sim;
        bestMatchIdx = j;
      }
    }

    if (bestMatchIdx !== -1 && bestSimilarity >= 0.5) {
      usedSpokenIndices.add(bestMatchIdx);
      const matchedSpoken = spokenWords[bestMatchIdx];
      const score = Math.round(bestSimilarity * 100);

      const status: 'matched' | 'close' | 'missed' = 
        score >= 85 ? 'matched' : score >= 60 ? 'close' : 'missed';

      wordComparisons.push({
        targetWord: tWord,
        spokenWord: matchedSpoken,
        status,
        score
      });
      totalScore += score;
    } else {
      wordComparisons.push({
        targetWord: tWord,
        status: 'missed',
        score: 0
      });
    }
  }

  const accuracy = Math.round(totalScore / targetWords.length);

  let rating: 'perfect' | 'great' | 'good' | 'retry';
  let ratingLabel: string;

  if (accuracy >= 88) {
    rating = 'perfect';
    ratingLabel = 'Ausgezeichnet! (Perfect!)';
  } else if (accuracy >= 72) {
    rating = 'great';
    ratingLabel = 'Sehr gut! (Very Good!)';
  } else if (accuracy >= 50) {
    rating = 'good';
    ratingLabel = 'Gut versucht! (Good Effort)';
  } else {
    rating = 'retry';
    ratingLabel = 'Noch einmal! (Try Again)';
  }

  const feedbackTip = getGermanPhoneticTip(targetPhrase);

  return {
    accuracy,
    rating,
    ratingLabel,
    feedbackTip,
    wordComparisons,
    recognizedTranscript: spokenTranscript
  };
}
