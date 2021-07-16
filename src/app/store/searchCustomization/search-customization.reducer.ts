import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as canvasStateActions from './search-customization.actions';
import { SearchCustomizationModel } from './searchCustomizationModel';

export const canvasStateFeatureKey = 'canvasStateModels';

export interface SearchState extends EntityState<SearchCustomizationModel> {
  // additional entities state properties
}

export const adapter: EntityAdapter<SearchCustomizationModel> = createEntityAdapter<SearchCustomizationModel>();

export const initialState:  SearchState = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(canvasStateActions.loadSearchCustomizationEntities,
    (state:any, action: any) => adapter.setAll(action.loadSearchCustomizationEntities, state)
  ),
  on(canvasStateActions.addSearchCustomizationEntity,
    (state:any, action: any) => adapter.setAll(action.addSearchCustomizationEntity, state)
  ),
  on(canvasStateActions.deleteSearchCustomizationEntity,
    (state:any, action: any) => adapter.setAll(action.deleteSearchCustomizationEntity, state)
  ),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();