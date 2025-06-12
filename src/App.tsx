import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { RecipeDetail } from './pages'
import { Recipes } from './pages/Recipes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Header } from './Header'
import { FavoriteProvider } from './FavoriteContext'
import { Favorites } from './pages/Favorites'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FavoriteProvider>
        <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/">
              <Route path="recipes" element={<Recipes />} />
              <Route path="recipes/:recipeId" element={<RecipeDetail />} />
              <Route path="favorites" element={<Favorites />} />
              <Route index element={<Navigate to="recipes" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </FavoriteProvider>
    </QueryClientProvider>
  )
}

export default App
