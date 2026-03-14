/**
 * Type definitions for ML Roadmap
 */

export interface Subtopic {
  id: string;
  title: string;
  resources?: string[]; // URLs or resource names
}

export interface Topic {
  id: string;
  title: string;
  desc: string;
  diff: 1 | 2 | 3 | 4;
  tag: TopicTag;
  subtopics: Subtopic[];
}

export interface Phase {
  id: string;
  title: string;
  label: string;
  duration: string;
  color: string;
  icon: string;
  desc: string;
  topics: Topic[];
}

export type TopicTag = 'lang' | 'lib' | 'math' | 'concept' | 'algo' | 'skill' | 'arch' | 'tool' | 'deploy' | 'llm';

export interface TagColorConfig {
  bg: string;
  color: string;
  border: string;
}

export interface Resource {
  href: string;
  label: string;
}

export interface ProgressState {
  done: Set<string>;
  collapsed: Set<string>;
}
