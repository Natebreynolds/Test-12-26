export interface AnalysisResponse {
  sections: AnalysisSection[];
  metadata?: Record<string, any>;
}

export interface AnalysisSection {
  title: string;
  items: string[];
}

export interface AnalysisRequest {
  transcript: string;
  metadata?: Record<string, any>;
}