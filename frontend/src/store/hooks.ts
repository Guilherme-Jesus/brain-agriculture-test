import { createSelector } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from './store'

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelect = useSelector.withTypes<RootState>()

export function useAppSelector<T>(selector: (state: RootState) => T) {
  const memoizedSelector = createSelector((state: RootState) => state, selector)
  return useAppSelect(memoizedSelector)
}
