import { useEffect, useState } from 'react';
import useLocalStorage from 'src/components/hooks/useLocalStorage';
import { CardCount, CardData } from '../../types/card.types';

const useCard = (cards: CardData[], playingDeck: number) => {
  const groupedCards: Record<number, CardData[]> = {};

  // Group cards by rank
  for (const card of cards) {
    if (!groupedCards[card.rank]) {
      groupedCards[card.rank] = [];
    }
    groupedCards[card.rank].push(card);
  }

  const [loading, setLoading] = useState(true);
  const [deckCount, setDeckCount] = useLocalStorage<number>('deckCount', playingDeck);
  const [totalCardsRemaining, setTotalCardsRemaining] = useLocalStorage<number>('totalCardsRemaining', deckCount * 52);
  const [totalCardsPlayed, setTotalCardsPlayed] = useLocalStorage<number>('totalCardsPlayed', 0);
  const [numberOfTens, setNumberOfTens] = useLocalStorage<number>('numberOfTens', 0);
  const [numberOfAces, setNumberOfAces] = useLocalStorage<number>('numberOfAces', 0);

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

  const [cardCounts, setCardCounts] = useLocalStorage<CardCount[]>('cardCounts', initialCards);

  // Retrieve history from localStorage or initialize it
  const [history, setHistory] = useState<CardCount[][]>(
    JSON.parse(localStorage.getItem('cardHistory') || '[]') || []
  );

  useEffect(() => {
    // Save history to localStorage whenever it changes
    localStorage.setItem('cardHistory', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    setCardCounts(prevCounts =>
      prevCounts.map(card => ({
        ...card,
        count: Math.min(card.originalCount * deckCount, card.count),
      }))
    );
  }, [deckCount, setCardCounts]);

  const updateCardCounts = (updatedCounts: CardCount[]) => {
    const newTotal = updatedCounts.reduce((sum, card) => sum + card.count, 0);
    setTotalCardsRemaining(newTotal);

    const tensCount = updatedCounts.reduce(
      (count, card) => count + (isTenValueCard(card.rank) ? card.count : 0),
      0
    );
    setNumberOfTens(tensCount);

    const acesCount = updatedCounts.reduce(
      (count, card) => count + (isAceCard(card.rank) ? card.count : 0),
      0
    );
    setNumberOfAces(acesCount);
  };

  const isAceCard = (rank: number) => rank === 1;
  const isTenValueCard = (rank: number) => [10, 11, 12, 13].includes(rank);

  const handleAddClick = (cardName: string) => {
    setCardCounts(prevCounts => {
      const updatedCounts = prevCounts.map(card =>
        card.name === cardName && card.count < card.originalCount * deckCount
          ? { ...card, count: card.count + 1 }
          : card
      );

      // Save current state to history before updating
      setHistory(prevHistory => [...prevHistory, prevCounts]);
      updateCardCounts(updatedCounts);
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

      // Save current state to history before updating
      setHistory(prevHistory => [...prevHistory, prevCounts]);
      updateCardCounts(updatedCounts);
      return updatedCounts;
    });
  };

  const handleReset = () => {
    setDeckCount(playingDeck);
    setCardCounts(initialCards);
    setTotalCardsRemaining(initialCards.reduce((sum, card) => sum + card.count, 0));
    setNumberOfTens(0);
    setNumberOfAces(0);
    setHistory([]); // Clear history on reset
    localStorage.removeItem('cardHistory'); // Clear history from localStorage
  };

  const handleUndo = () => {
    setHistory(prevHistory => {
      const lastState = prevHistory[prevHistory.length - 1];
      if (lastState) {
        // Restore the last state and remove it from history
        setCardCounts(lastState);
        updateCardCounts(lastState);
        return prevHistory.slice(0, -1);
      }
      return prevHistory; // No history to undo
    });
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
    totalCardsPlayed,
    numberOfAces,
    handleUndo
  } as const;
};

export default useCard;
