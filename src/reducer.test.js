import reducer from './reducer';
import {newGame, makeGuess, toggleInfoModal} from './actions';

describe('reducer', () => {
  it('should set the initial state when nothing is passed in', () => {
    const state = reducer(undefined, {type: '_UNKNOWN'});
    expect(state.guesses).toEqual([]);
    expect(state.feedback).toEqual('Make your guess!');
    expect(state.correctAnswer).toBeGreaterThanOrEqual(0);
    expect(state.correctAnswer).toBeLessThanOrEqual(100);
    expect(state.showInfoModal).toEqual(false);
  });
  it('should return the current state on an unknown action', () => {
    let currentState = {};
    const state = reducer(currentState, {type: '_UNKNOWN'});
    expect(state).toBe(currentState);
  });
  describe('newGame', () => {
    it('should restart the game', () => {
      let state = {
        guesses: [1, 3, 69],
        feedback: 'Cold',
        correctAnswer: 69,
        showInfoModal: false
      };
      state = reducer(state, newGame());
      expect(state.guesses).toEqual([]);
      expect(state.feedback).toEqual('Make your guess!');
      expect(state.correctAnswer).toBeGreaterThanOrEqual(0);
      expect(state.correctAnswer).toBeLessThanOrEqual(100);
      expect(state.showInfoModal).toEqual(false);
    });
  });
  describe('makeGuess', () => {
    it('should make a guess', () => {
      let state = {
        guesses: [],
        feedback: '',
        correctAnswer: 10
      };
      state = reducer(state, makeGuess(10));
      expect(state.guesses).toEqual([10]);
      expect(state.feedback).toEqual('You got it!');
    });
  });
  describe('toggleInfoModal', () => {
    it('should toggle the info modal on', () => {
      let state = {
        showInfoModal: false
      };
      state = reducer(state, toggleInfoModal());
      expect(state.showInfoModal).toEqual(true);
    });
    it('should toggle the info modal off', () => {
      let state = {
        showInfoModal: true
      };
      state = reducer(state, toggleInfoModal());
      expect(state.showInfoModal).toEqual(false);
    });
  });
});