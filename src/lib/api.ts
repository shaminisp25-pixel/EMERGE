// EMERGE API Connectivity Client

const API_BASE_URL = '/api/v1';

export interface MoodAnalysisResponse {
    sentiment_polarity: number;
    analysis_id: string;
    message: string;
}

export interface MoodEntryCreate {
    mood_label: string;
    mood_note?: string;
    reflection_text?: string;
}

export const api = {
    /**
     * Send a mood entry to the backend for NLP analysis and persistence.
     */
    async analyzeReflection(data: MoodEntryCreate): Promise<MoodAnalysisResponse | null> {
        try {
            const response = await fetch(`${API_BASE_URL}/reflections/analyze`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Failed to connect to EMERGE backend:', error);
            return null;
        }
    },

    /**
     * Check if the backend is reachable.
     */
    async checkHealth(): Promise<boolean> {
        try {
            const response = await fetch(`${API_BASE_URL}/health`, { method: 'GET' });
            return response.ok;
        } catch {
            return false;
        }
    },
};
