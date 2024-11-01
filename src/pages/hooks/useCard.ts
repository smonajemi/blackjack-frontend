import { useEffect, useState } from 'react';

interface CardData {
  rank: number;
  name: string;
  imageUrl: string;
}

interface CardCount {
  rank: number;
  count: number;
  originalCount: number;
  name: string;
  imageUrl: string;
}

const useCard = (cards: CardData[], playingDeck: number) => {
  const groupedCards: Record<number, CardData[]> = {};

  for (const card of cards) {
    if (!groupedCards[card.rank]) {
      groupedCards[card.rank] = [];
    }
    groupedCards[card.rank].push(card);
  }

  const [loading, setLoading] = useState(true);
  const [deckCount, setDeckCount] = useState<number>(playingDeck);
  const [totalCardsRemaining, setTotalCardsRemaining] = useState<number>(deckCount * 52);
  const [totalCardsPlayed, setTotalCardsPlayed] = useState<number>(0);
  const [numberOfTens, setNumberOfTens] = useState<number>(0);

  const initialCards: CardCount[] = [];

  for (const rank in groupedCards) {
    const cardArray = groupedCards[rank];
    initialCards.push({
      rank: Number(rank),
      count: Number(cardArray.length * deckCount),
      originalCount: Number(cardArray.length),
      name: cardArray[0].name,
      imageUrl: cardArray[0].imageUrl,
    });
  }
  const [cardCounts, setCardCounts] = useState<CardCount[]>(initialCards);

  useEffect(() => {
    setCardCounts(prevCounts =>
      prevCounts.map(card => ({
        ...card,
        count: Math.min(card.originalCount * deckCount, card.count),
      }))
    );
  }, [deckCount]);

  const isTenValueCard = (rank: number) => [10, 11, 12, 13].includes(rank); // 10, Jack, Queen, King

  const handleAddClick = (cardName: string) => {
    setCardCounts(prevCounts => {
      const updatedCounts = prevCounts.map(card =>
        card.name === cardName && card.count < card.originalCount * deckCount
          ? { ...card, count: card.count + 1 }
          : card
      );
      const newTotal = updatedCounts.reduce((sum, card) => sum + card.count, 0);
      setTotalCardsRemaining(newTotal);

      // Count if a 10-value card was played
      const tensCount = updatedCounts.reduce(
        (count, card) => count + (isTenValueCard(card.rank) ? card.count : 0),
        0
      );
      setNumberOfTens(tensCount);

      return updatedCounts;
    });
  };

  const handleRemoveClick = (cardName: string) => {
    setCardCounts(prevCounts => {
      const updatedCounts = prevCounts.map(card =>
        card.name === cardName && card.count > 0
          ? { ...card, count: card.count - 1 }
          : card
      );
      const newTotal = updatedCounts.reduce((sum, card) => sum + card.count, 0);
      setTotalCardsRemaining(newTotal);

      // Update count of 10-value cards
      const tensCount = updatedCounts.reduce(
        (count, card) => count + (isTenValueCard(card.rank) ? card.count : 0),
        0
      );
      setNumberOfTens(tensCount);

      return updatedCounts;
    });
  };

  const handleReset = () => {
    setDeckCount(playingDeck);
    setCardCounts(initialCards);
    setTotalCardsRemaining(initialCards.reduce((sum, card) => sum + card.count, 0));
    setNumberOfTens(0); // Reset 10-value card count
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return {
    loading,
    deckCount,
    totalCardsRemaining,
    cardCounts,
    handleAddClick,
    handleRemoveClick,
    handleReset,
    setDeckCount,
    numberOfTens,
    totalCardsPlayed, // This can be updated as needed
  };
};

export default useCard;
