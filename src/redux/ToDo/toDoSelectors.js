import {createSelector} from 'reselect';

export const getPositions = (state) => (state.toDo.length > 0 ? state.toDo.filter(item => item.id === 'positions')[0]['positions'].split(',') : null);
export const getPositionsObject = (state) => (state.toDo.length > 0 ? state.toDo.filter(item => item.id === 'positions')[0] : null);
const getUnsortedToDos = (state) => (state.toDo.length > 0 ? state.toDo.filter(item => item.id !== 'positions') : null);

export const getToDos = createSelector([
    getPositions,
    getUnsortedToDos
], (
    positions,
    unsortedToDos,
) => {
    return !!positions ? positions.map(position => unsortedToDos.filter(toDo => toDo.id === position)[0]) : null;
});
