"use client";

interface AnalysisSection {
  title: string;
  items: string[];
}

export function formatAnalysisResponse(response: any): AnalysisSection[] {
  try {
    // Handle string response
    if (typeof response === 'string') {
      return [{
        title: 'Analysis',
        items: [response]
      }];
    }

    // Handle object response
    if (typeof response === 'object' && response !== null) {
      // If response is already in our desired format
      if (Array.isArray(response) && response.every(item => 
        item.title && Array.isArray(item.items)
      )) {
        return response;
      }

      // If response is nested under a 'response' key
      if (response.response) {
        return formatAnalysisResponse(response.response);
      }

      // Convert flat object to sections
      return Object.entries(response)
        .filter(([_, value]) => value) // Filter out empty values
        .map(([key, value]) => ({
          title: key.split('_').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' '),
          items: Array.isArray(value) ? value : [String(value)]
        }));
    }

    // Fallback for unexpected formats
    return [{
      title: 'Analysis',
      items: ['Unable to format response. Please try again.']
    }];
  } catch (error) {
    console.error('Error formatting analysis response:', error);
    return [{
      title: 'Error',
      items: ['Failed to format analysis results. Please try again.']
    }];
  }
}