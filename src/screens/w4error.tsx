// Re-export of the fix swarm's shared ErrorBoundary (AUDIO_CONTRACT.md rule 4).
// Keeps Worker 4 screens' existing `W4ErrorBoundary` imports working.
export { ErrorBoundary as W4ErrorBoundary } from '../components/ErrorBoundary';
