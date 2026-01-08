import { LearningRoadmap } from '../types';

export function getCurrentStageId(roadmap: LearningRoadmap | null): string | null {
  if (!roadmap) return null;

  const currentStage = roadmap.stages
    .slice() // avoid mutating original array
    .sort((a, b) => a.order - b.order)
    .find((stage) => !stage.completed);

  return currentStage?.id ?? null;
}
