# Redux Tutorial Setup

This project contains a simple TypeScript backend and React frontend setup. Follow the instructions below to implement Redux in the frontend.

## Project Structure

```
Redux/
├── backend/          # TypeScript Express server
├── frontend/         # React TypeScript app
└── README.md         # This file
```

## Backend

The backend is already set up with TypeScript and Express. To run:

```bash
cd Redux/backend
npm install
npm run dev
```

Server runs on http://localhost:3001

## Frontend

The frontend is a React app with TypeScript. To run:

```bash
cd Redux/frontend
npm install
npm start
```

App runs on http://localhost:3000

## Implementing Redux

Follow these steps to add Redux to the frontend:

### 1. Install Redux Dependencies

```bash
cd Redux/frontend
npm install @reduxjs/toolkit react-redux
```

### 2. Create Store Structure

Create a `store` folder in `src`:

```
src/
├── store/
│   ├── store.ts
│   ├── counterSlice.ts
│   └── hooks.ts
```

### 3. Create Counter Slice (`src/store/counterSlice.ts`)

```typescript
import { createSlice } from '@reduxjs/toolkit';

export interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
```

### 4. Create Store (`src/store/store.ts`)

```typescript
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### 5. Create Typed Hooks (`src/store/hooks.ts`)

```typescript
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

### 6. Wrap App with Provider (`src/index.tsx`)

Add these imports:

```typescript
import { Provider } from 'react-redux';
import { store } from './store/store';
```

Wrap the App component:

```typescript
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

### 7. Update App Component (`src/App.tsx`)

```typescript
import React from 'react';
import { useAppSelector, useAppDispatch } from './store/hooks';
import { increment, decrement, incrementByAmount } from './store/counterSlice';

function App() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Redux Counter</h1>
        <p>Count: {count}</p>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
        <button onClick={() => dispatch(incrementByAmount(5))}>Increment by 5</button>
      </header>
    </div>
  );
}

export default App;
```

## Running the Complete App

1. Start the backend: `cd Redux/backend && npm run dev`
2. Start the frontend: `cd Redux/frontend && npm start`
3. Open http://localhost:3000 to see the Redux counter app
4. The backend API is available at http://localhost:3001/api