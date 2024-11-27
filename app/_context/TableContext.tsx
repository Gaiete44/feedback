// app/_context/TableContext.tsx
'use client'

import { createContext, useContext, useReducer, ReactNode } from 'react';

interface TableState {
  tableNumber: number | null;
  numberOfPeople: number | null;
  currentRound: number;
  roundStartTime: string | null;
  ordersThisRound: { [personNumber: number]: number };
}

interface TableContextType extends TableState {
  setTableInfo: (tableNumber: number, numberOfPeople: number) => void;
  incrementRound: () => void;
  addOrder: (personNumber: number) => boolean;
  resetRoundOrders: () => void;
}

type TableAction = 
  | { type: 'SET_TABLE_INFO'; payload: { tableNumber: number; numberOfPeople: number } }
  | { type: 'INCREMENT_ROUND' }
  | { type: 'ADD_ORDER'; payload: number }
  | { type: 'RESET_ROUND_ORDERS' };

const TableContext = createContext<TableContextType | undefined>(undefined);

const tableReducer = (state: TableState, action: TableAction): TableState => {
  switch (action.type) {
    case 'SET_TABLE_INFO':
      return {
        ...state,
        tableNumber: action.payload.tableNumber,
        numberOfPeople: action.payload.numberOfPeople,
        roundStartTime: new Date().toISOString(),
        currentRound: 1,
        ordersThisRound: {}
      };
    case 'INCREMENT_ROUND':
      return {
        ...state,
        currentRound: state.currentRound + 1,
        roundStartTime: new Date().toISOString(),
        ordersThisRound: {}
      };
    case 'ADD_ORDER':
      const currentOrders = state.ordersThisRound[action.payload] || 0;
      return {
        ...state,
        ordersThisRound: {
          ...state.ordersThisRound,
          [action.payload]: currentOrders + 1
        }
      };
    case 'RESET_ROUND_ORDERS':
      return {
        ...state,
        ordersThisRound: {}
      };
    default:
      return state;
  }
};

export const TableProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(tableReducer, {
    tableNumber: null,
    numberOfPeople: null,
    currentRound: 0,
    roundStartTime: null,
    ordersThisRound: {}
  });

  const contextValue: TableContextType = {
    ...state,
    setTableInfo: (tableNumber: number, numberOfPeople: number) => 
      dispatch({ type: 'SET_TABLE_INFO', payload: { tableNumber, numberOfPeople } }),
    incrementRound: () => dispatch({ type: 'INCREMENT_ROUND' }),
    addOrder: (personNumber: number) => {
      const currentOrders = state.ordersThisRound[personNumber] || 0;
      if (currentOrders >= 3) return false;
      dispatch({ type: 'ADD_ORDER', payload: personNumber });
      return true;
    },
    resetRoundOrders: () => dispatch({ type: 'RESET_ROUND_ORDERS' })
  };

  return (
    <TableContext.Provider value={contextValue}>
      {children}
    </TableContext.Provider>
  );
};

export const useTable = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error('useTable must be used within a TableProvider');
  }
  return context;
};