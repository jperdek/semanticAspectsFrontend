
export interface AutomatizationResult {
    fileName: string;
    category: string | null;
    categories: string[] | null;
    categories_with_scores: any[];
    concepts_with_scores: any[];
    analyzed_text: string | null;
    interesting_parts: string[] | null;
    links: string[] | null;
    mappings: any[];
    readability_metrics: any[];
}
